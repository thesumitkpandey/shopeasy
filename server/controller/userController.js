import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import users from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const checkAuth = asyncHandler(async (req, res, next) => {
  console.log(req.loggedInUser);
  try {
    res.status(200).json({
      success: true,
      message: `Signed In as ${req.loggedInUser.name}`,
      userInfo: {
        id: req.loggedInUser._id,
        name: req.loggedInUser.name,
        email: req.loggedInUser.email,
        phone: req.loggedInUser.phone,
        role: req.loggedInUser.role,
        photo: req.loggedInUser.photo,
        wishlist: req.loggedInUser.wishlist,
      },
    });
  } catch (err) {
    console.log(err);
    return next(new CustomError("internal server error", 500));
  }
});
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

  res.status(200).json({
    success: true,
    message: "Login Successful",
    token: jwtToken,
    userInfo: {
      id: correctUserData.id,
      name: correctUserData.name,
      email: correctUserData.email,
      role: correctUserData.role,
      phone: correctUserData.phone,
      photo: correctUserData.photo,
      wishlist: correctUserData.wishlist,
    },
  });
});
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return next(new CustomError("All fields are mandatory", 400));
  }
  const isExisting = await users.findOne({
    $or: [{ email }, { phone }],
  });
  if (isExisting) {
    return next(new CustomError("User already exists", 401));
  }
  let newUser = await users.create({
    name,
    email,
    password,
    phone,
  });
  res.status(201).json({
    success: true,
    message: "Signup successful, Signin to continue",
  });
});
const signout = asyncHandler((req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENVIRONMENT === "production",
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
  res.status(200).json({
    success: true,
    message: "Signout successful",
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
    message: "Account deleted successfully",
  });
});

const googleAuthController = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  let userDetails;
  userDetails = await users.findOne({ email });

  if (!userDetails) {
    const userDetails = await users.create({ name, email, phone });
  }
  const jwtToken = jwt.sign(
    { _id: userDetails._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
  res.status(200).json({
    success: true,
    message: "Signed In with Google",
    token: jwtToken,
    userInfo: {
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      role: userDetails.role,
    },
  });
});
const productWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  if (!productId) {
    return next(new CustomError("No product id mentioned", 404));
  }

  const productIndex = req.loggedInUser.wishlist.indexOf(productId);
  if (productIndex == -1) {
    req.loggedInUser.wishlist.push(productId);
  } else {
    req.loggedInUser.wishlist.splice(productIndex, 1);
  }
  const isModified = await req.loggedInUser.save();
  console.log(isModified);
  if (isModified) {
    res.status(201).json({
      success: true,
      message: "Successfully Modified",
    });
  } else {
    return next(new CustomError("Error modifying wishlist", 500));
  }
});
export {
  authUser,
  signout,
  register,
  updateProfile,
  deleteAccount,
  checkAuth,
  googleAuthController,
  productWishlist,
};
