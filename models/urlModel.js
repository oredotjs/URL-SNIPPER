const mongoose = require("mongoose");
const CatchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    unique: true,
  },
  urlId: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
urlSchema.index({ urlId: 1 });

module.exports = mongoose.model("Url", urlSchema);
