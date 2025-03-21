import express from "express";
const router = express.Router();
import {
  authUser,
  signout,
  register,
  updateProfile,
  deleteAccount,
  checkAuth,
} from "../controller/userController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

router
  .route("/auth")
  .get(protect, checkAuth)
  .post(authUser)
  .put(protect, updateProfile)
  .delete(protect, deleteAccount);
router.post("/signup", register);
router.get("/logout", signout);
export default router;
