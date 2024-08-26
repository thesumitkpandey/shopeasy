import express from "express";
import {
  addProductReview,
  getProducts,
  getProductsById,
} from "../controller/productController.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductsById);
router.post("/:id/reviews", addProductReview);
export default router;
