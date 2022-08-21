const mongoose = require("mongoose");

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

urlSchema.pre("save", async function (next) {
  const check = this.constructor.findOne(
    { originalUrl: this.originalUrl },
    (err, url) => {
      if (err) {
        return next(err);
      }
      if (url) {
        return next(new Error("Url already exists"));
      }
      next();
    }
  );
});

module.exports = mongoose.model("Url", urlSchema);
