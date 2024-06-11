const CatchAsyncError = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

//authenticated User
const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  // const access_token = req.cookies.access_token;
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Not authenticated", 400));
  }
  const access_token = req.headers.authorization;
  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resource", 400));
  }
  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
  if (!decoded) {
    return next(new ErrorHandler("Access token is not valid", 400));
  }
  //   const user = await redis.get(decoded.id);
  //   if (!user) {
  //     return next(new ErrorHandler("Please login to access this resource", 400));
  //   }
  req.user = decoded;
  next();
});

const checkRefreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
    if (!decoded) {
      return next(new ErrorHandler("Could not refresh token", 400));
    }

    req.auth = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  next();
};

//validate user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user?.role) || "") {
      return next(
        new ErrorHandler(
          `Role ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  authorizeRoles,
  checkRefreshToken,
};
