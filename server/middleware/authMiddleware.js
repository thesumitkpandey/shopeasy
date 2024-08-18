import asyncHandler from "./asyncHandler.js";
import CustomError from "./CustomError.js";
import users from "../model/userModel.js";
import jwt from "jsonwebtoken";
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.loggedInUser = await users.findById(decoded.id);
      next();
    } catch (err) {
      console.log(err);
      return next(new CustomError("Not authorized", 401));
    }
  } else {
    return next(new CustomError("Not authorized", 401));
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    return next(new CustomError("Not authorized", 401));
  }
});
export { protect, isAdmin };
