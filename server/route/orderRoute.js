import {
  createOrder,
  getAllOrders,
  getMyOrder,
  modifyOrder,
  getOrderById,
} from "../controller/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

//USER ROUTES
router.route("/").post(protect, createOrder).get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderById);
router
  .route("/admin")
  .get(protect, isAdmin, getAllOrders)
  .put(protect, isAdmin, modifyOrder);

export default router;
