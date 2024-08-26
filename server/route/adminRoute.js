import {
  getAllProducts,
  deleteOrder,
  getAllOrders,
  modifyProduct,
  getAllUsers,
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
router.route("/products", adminProtect).get(getAllProducts);
router.route("/products/:id", adminProtect).put(modifyProduct);

//USERS MANIPULATION
router.route("/users", adminProtect).get(getAllUsers);
export default router;
