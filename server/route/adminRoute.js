import {
  getAllProducts,
  deleteOrder,
  getAllOrders,
  modifyProduct,
  getAllUsers,
  modifyOrder,
  createProduct,
  deleteProduct,
  deactivateUser,
} from "../controller/adminController.js";
import { adminProtect } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

//ORDERS complete
router
  .route("/orders", adminProtect)
  .get(getAllOrders)
  .put(modifyOrder)
  .delete(deleteOrder);

//PRODUCTS complete
router
  .route("/products", adminProtect)
  .get(getAllProducts)
  .delete(deleteProduct)
  .post(createProduct);
router.route("/products/:id", adminProtect).put(modifyProduct);

//USERS MANIPULATION
router.route("/users", adminProtect).get(getAllUsers).put(deactivateUser);
export default router;
