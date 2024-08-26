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
const addProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const productInfo = await products.findById(req.params.id);
  const alreadyReviewed = productInfo.reveiws.filter(
    (reviewElement) => reviewElement.users == req.loggedInUser._id
  );
  if (alreadyReviewed > 0) {
    return next(new CustomError("Product already reviewed by the user", 401));
  }
  const review = {
    name: req.loggedInUser.name,
    comment,
    points: Number(rating),
    users: req.loggedInUser._id,
  };
  products.reviews.push(review);
  products.ratings = products.ratings.reduce(
    (acc, cur) =>
      (productInfo.ratings * reviewCounts + rating) / (reviewCounts + 1),
    productInfo.ratings || 0
  );
  products.reviewCounts += 1;
  const newProductInfo = await products.save();
  if (newProductInfo) {
    req.status(200).json(newProductInfo);
  } else {
    return next(new CustomError("Failed to create review", 400));
  }
});
export { getProducts, getProductsById, addProductReview };
