const express = require("express");
const { isAuthenticated, checkRefreshToken } = require("../middleware/auth");
const {
  registrationUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
} = require("../controllers/user.controller");
const userRouter = express.Router();
userRouter.post("/registration", registrationUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/user-info", isAuthenticated, getUserInfo);
userRouter.get("/refresh", checkRefreshToken, updateAccessToken);

module.exports = userRouter;
