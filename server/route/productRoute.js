import express from "express";
import {
  addProductReview,
  getProducts,
  getProductsById,
} from "../controller/productController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/:id/reviews", protect, addProductReview);
export default router;
