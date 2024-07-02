import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/errorMiddleware.js";
import products from "../model/productModel.js";
const getProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await products.find({});
  res.status(200).json(allProducts);
});
const getProductsById = asyncHandler(async (req, res, next) => {
  const products = await products.findById(req.params.id);
  if (products) {
    res.status(200).json(products);
  } else {
    return next(new CustomError(404, "Product with this id not found"));
  }
});
export { getProducts, getProductsById };
