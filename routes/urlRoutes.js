const express = require("express");
const urlController = require("../controllers/urlController");
const router = express.Router();
router
  .route("/")
  .post(urlController.createNewUrl)
  .get(urlController.getAllUrls);
router
  .route("/:urlId")
  .get(urlController.getUrl)
  .delete(urlController.deleteUrl);
module.exports = router;
