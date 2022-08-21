const express = require("express");
const morgan = require("morgan");
const urlRouter = require("./routes/urlRoutes");

const app = express();
app.use(morgan("tiny"));
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/url", urlRouter);

module.exports = app;
