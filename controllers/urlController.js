const Url = require("../models/urlModel");
const catchAsync = require("../utils/catchAsync");
const nanoid = require("nanoid");
const validUrl = require("valid-url");
const AppError = require("../utils/AppError");

const shortCode = (number) => {
  return nanoid(number);
};
exports.validateUrl = (req, res, next) => {
  if (!validUrl.isUri(req.body.url)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid url",
    });
  }
  next();
};

exports.createNewUrl = catchAsync(async (req, res, next) => {
  const originalUrl = req.body.url;
  const urlId = shortCode(6);
  const shortUrl = `${req.protocol}://${req.get("host")}/api/v1/url/${urlId}`;
  const newUrl = await Url.create({
    originalUrl,
    urlId,
    shortUrl,
  });
  res.status(201).json({
    status: "success",
    data: {
      newUrl,
    },
  });
});

exports.getUrl = catchAsync(async (req, res, next) => {
  const url = await Url.findOne({ urlId: req.params.urlId });
  if (!url) {
    return next(
      new AppError(`No url found with urlId ${req.params.urlId}`, 404)
    );
  }
  if (url) {
    url.clicks++;
    await url.save();
    res.status(200).json({
      status: "success",
      data: {
        url,
      },
    });
  }
});

exports.getAllUrls = catchAsync(async (req, res, next) => {
  const urls = await Url.find();
  res.status(200).json({
    status: "success",
    results: urls.length,
    data: {
      urls,
    },
  });
});

exports.deleteUrl = catchAsync(async (req, res, next) => {
  const url = await Url.findOneAndDelete(req.params.urlId);
  if (!url) {
    return next(
      new AppError(`No url found with urlId ${req.params.urlId}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createCustomUrl = catchAsync(async (req, res, next) => {
  const originalUrl = req.body.url;
  const urlId = req.body.customName;
  const shortUrl = `${req.protocol}://${req.get("host")}/api/v1/url/${urlId}`;
  const url = await Url.create({
    originalUrl,
    urlId,
    shortUrl,
  });
  res.status(201).json({
    status: "success",
    data: {
      url,
    },
  });
});
