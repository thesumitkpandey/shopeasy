import {
  createProduct,
  deleteOrder,
  getAllOrders,
  modifyOrder,
} from "../controller/adminController.js";
import { adminProtect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

//ORDERS MANIPULATION
router
  .route("/orders", adminProtect)
  .get(getAllOrders)
  .put(modifyOrder)
  .delete(deleteOrder);

//PRODUCTS MANIPULATION
router.route("/products", adminProtect).post(createProduct);
export default router;
