import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import users from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const authUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!password || !email) {
    return next(new CustomError("Please enter email and password", 400));
  }
  const correctUserData = await users.findOne({ email });
  if (!correctUserData) {
    return next(new CustomError("Incorrect credentials please try again", 400));
  }

  let isValidPassword = await bcrypt.compare(
    password,
    correctUserData.password
  );

  if (!isValidPassword) {
    return next(new CustomError("Invalid password", 400));
  }
  const jwtToken = jwt.sign(
    { _id: correctUserData._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT == "development" ? false : true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
  });
  res.status(200).json({
    id: correctUserData.id,
    name: correctUserData.name,
    email: correctUserData.email,
    isAdmin: correctUserData.isAdmin,
    phone: correctUserData.phone,
  });
});
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new CustomError("All fields are mandatory", 400));
  }
  const isExisting = await users.findOne({ email });
  if (isExisting) {
    return next(new CustomError("User already exists", 401));
  }
  let newUser = await users.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    success: true,
  });
});
const logout = asyncHandler((req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT == "development" ? false : true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
  res.status(200).json({
    success: true,
  });
});

const updateProfile = asyncHandler(async (req, res, next) => {
  if (!req.body.name && !req.body.email && !req.body.phone) {
    return next(new CustomError("Modify at least a new field"));
  }
  const newUserDetails = await users.findByIdAndUpdate(req.loggedInUser._id, {
    name: req.body.name || req.loggedInUser.name,
    email: req.body.email || req.loggedInUser.email,
    phone: req.body.phone || req.loggedInUser.phone,
  });
  res.status(200).json({
    success: true,
  });
});
const deleteAccount = asyncHandler(async (req, res, next) => {
  if (!req.body.password) {
    return next(
      new CustomError("Please enter your password to delete account")
    );
  }
  const isCorrectPassword = await bcrypt.compare(
    req.body.password,
    req.user.password
  );
  if (!isCorrectPassword) {
    return next(new CustomError("Enter correct password", 404));
  }
  let user = await users.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    success: true,
  });
});

export { authUser, logout, register, updateProfile, deleteAccount };
