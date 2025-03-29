import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import products from "../model/productModel.js";
const getProducts = asyncHandler(async (req, res, next) => {
  //Product filtering feature
  const filteringQuery = {};
  if (req.query.search) {
    filteringQuery.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
    ];
  }
  if (req.query.category) {
    filteringQuery.category =
      req.query.category[0].toUpperCase() + req.query.category.slice(1);
  }
  if (req.query.inStock) {
    filteringQuery.inStock = { $gt: 0 };
  }
  if (req.query.minPrice || req.query.maxPrice) {
    filteringQuery.price = {};
    if (req.query.minPrice)
      filteringQuery.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice)
      filteringQuery.price.$lte = Number(req.query.maxPrice);
  }
  if (req.query.ratings) {
    filteringQuery.ratings = { $gte: Number(req.query.ratings) };
  }

  //Products Sorting feature
  const sortingQuery = {};
  if (req.query.sortByPrice) {
    sortingQuery.price = req.query.sortByPrice === "asc" ? 1 : -1;
  }
  if (req.query.sortByRating) {
    sortingQuery.ratings = -1;
  }

  //Product pagination feature
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const allProducts = await products
    .find(filteringQuery)
    .sort(sortingQuery)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    page: page,
    productsList: allProducts,
  });
});

const getProductsById = asyncHandler(async (req, res, next) => {
  const product = await products
    .findById(req.params.id)
    .populate("reviews.user", "name photo");

  console.log(product);
  if (product) {
    res.status(200).json({
      success: true,
      message: `ProductId ${product._id} fetched`,
      product: product,
    });
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
