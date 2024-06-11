const CatchAsyncError = require("../middleware/catchAsyncErrors");
const UserModel = require("../models/user.model");
const { getUserById } = require("../services/user.service");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/jwt");
const { registrationSchema, loginSchema } = require("../utils/validations");

/**
 * @desc Registration Method
 * @params string name
 * @params string email
 * @params string role
 * @params string password
 * @returns mixed
 */
const registrationUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    const { name, email, password, role } = req.body;
    console.log(req.body);
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }
    const userData = {
      name,
      email,
      password,
      role,
    };

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return next(new ErrorHandler("Email already exist", 400));
    }
    const user = await UserModel.create({
      ...userData,
    });
    res.status(201).json({
      success: true,
      message: `User created successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await UserModel.findOne({ email }, "+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//logout user
const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    const userId = req.user?._id || "";
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//update access token
const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  try {
    const { id, role, email, name, lastname } = req.auth;
    const user = { id, role, email, name, lastname };

    const accessToken = jwt.sign({ ...user }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ ...user }, process.env.REFRESH_TOKEN, {
      expiresIn: "6d",
    });
    req.user = user;
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);
    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//get user info
const getUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user?.id;
    getUserById(userId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
};
