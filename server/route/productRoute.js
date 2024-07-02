import express from "express";
import { getProducts } from "../controller/productController.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id");
export default router;
