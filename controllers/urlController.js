const Url = require("../models/urlModel");
const nanoid = require("nanoid");
const validUrl = require("valid-url");

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

exports.createNewUrl = async (req, res) => {
  try {
    const originalUrl = req.body.url;
    const urlId = shortCode(6);
    const shortUrl = `${req.protocol}://${req.get("host")}/api/v1/url/${urlId}`;
    const newUrl = await Url.create({
      originalUrl,
      urlId,
      shortUrl,
    });

    console.log(shortCode);
    res.status(201).json({
      status: "success",
      data: {
        newUrl,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
