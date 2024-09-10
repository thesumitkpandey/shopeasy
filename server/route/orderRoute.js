import {
  createOrder,
  getMyOrder,
  getOrderById,
} from "../controller/orderController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getMyOrder);

router.route("/:id").get(protect, getOrderById);

export default router;
