require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ErrorMiddleware = require("./middleware/error");
const userRouter = require("./routes/user.route");
const jobRouter = require("./routes/job.route");

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors or cross origin resource sharing
const corsOptions = {
  origin: [...process.env.ORIGIN],
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors());

app.use("/api/v1", userRouter, jobRouter);

//testing api

app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unkown route
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);

module.exports = app;
