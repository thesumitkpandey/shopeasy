import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import products from "../model/productModel.js";
const getProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await products.find({});
  if (!allProducts) {
    return next(new CustomError("Please try again later", 404));
  }
  res.status(200).json(allProducts);
});
const getProductsById = asyncHandler(async (req, res, next) => {
  const product = await products.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    return next(new CustomError("Product with this id does not exist", 404));
  }
});
export { getProducts, getProductsById };
