import express from "express";
const router = express.Router();
import {
  authUser,
  logout,
  register,
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controller/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
router
  .route("/")
  .post(authUser)

  .put(protect, updateProfile)
  .delete(protect, deleteAccount);
router.post("/signup", register);
router.route("/profile").get(protect, getProfile);
router.get("/logout", logout);
export default router;
