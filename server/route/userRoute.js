import express from "express";
const router = express.Router();
import {
  authUser,
  signout,
  register,
  updateProfile,
  deleteAccount,
  googleAuthController,
  productWishlist,
  checkAuth,
} from "../controller/userController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

router
  .route("/auth")
  .get(protect, checkAuth)
  .post(authUser)
  .put(protect, updateProfile)
  .delete(protect, deleteAccount);
router.post("/auth/signup", register);
router.get("/auth/logout", signout);
router.post("/auth/googleauth", googleAuthController);
router.put("/wishlist", protect, productWishlist);
export default router;
