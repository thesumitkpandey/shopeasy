import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import users from "../model/userModel.js";
import jwt from "jsonwebtoken";
const authUser = asyncHandler(async (req, res, next) => {
  if (!password && !email) {
    return next(new CustomError("Please enter a valid email or username", 400));
  }
  const correctUserData = await users.findOne({ email });
  if (!correctUserData) {
    return next(new CustomError("Incorrect credentials please try again", 400));
  }

  //   let isValidPassword = await bcrypt.compare(
  //     password,
  //     correctUserData.password
  //   );

  if (!isValidPassword) {
    return next(new CustomError("Invalid password", 400));
  }
  const jwtToken = jwt.sign(
    { id: correctUserData._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: NODE_ENVIRONMENT == "development" ? false : true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    //sameSite: "Strict"
  });
  res.status(200).json({
    success: true,
    user: {
      id: correctUserData._id,
      name: correctUserData.name,
      email: correctUserData.email,
      profilePicture: correctUserData.profilePicture,
      userName: correctUserData.userName,
    },
  });
});
export { authUser };
