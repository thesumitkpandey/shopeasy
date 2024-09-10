import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import products from "../model/productModel.js";
const getProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await products.find({});
  if (!allProducts) {
    return next(new CustomError("Please try again later", 404));
  }
  res.cookie("message", "Hello world");
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
  console.log("reqeust received");
  if (!rating || !comment) {
    return next(
      new CustomError("Review must contain a rating and comment", 400)
    );
  }

  const productInfo = await products.findById(req.params.id);

  if (!productInfo) {
    return next(new CustomError("Product not found", 404));
  }

  const alreadyReviewed = productInfo.reviews.find(
    (reviewElement) =>
      reviewElement.users.toString() === req.loggedInUser._id.toString()
  );

  if (alreadyReviewed) {
    return next(new CustomError("Product already reviewed by the user", 401));
  }

  const newReview = {
    name: req.loggedInUser.name,
    comment,
    rating: Number(rating),
    users: req.loggedInUser._id,
  };

  productInfo.reviews.push(newReview);

  productInfo.reviewCounts = productInfo.reviews.length;

  const totalRatings = productInfo.reviews.reduce(
    (acc, cur) => acc + cur.rating,
    0
  );
  productInfo.ratings = totalRatings / productInfo.reviewCounts;

  const newProductInfo = await productInfo.save();

  if (newProductInfo) {
    res.status(201).json(newProductInfo);
  } else {
    return next(new CustomError("Failed to create review", 400));
  }
});

export { getProducts, getProductsById, addProductReview };
