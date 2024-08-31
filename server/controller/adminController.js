import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import customError from "../middleware/CustomError.js";
import orders from "../model/orderModel.js";
import products from "../model/productModel.js";
import users from "../model/userModel.js";

//ORDERS
const getAllOrders = asyncHandler(async (req, res, next) => {
  const allOrders = await orders.find({});
  if (!allOrders) {
    return next(new customError("No orders found"));
  }
  res.status(200).json(allOrders);
});
const modifyOrder = asyncHandler(async (req, res, next) => {
  if (!req.body._id) {
    return next(new customError("Request does not contain order id"));
  }
  const updatedStatus = await orders.findByIdAndUpdate(
    req.body._id,
    {
      isDelivered: true,
    },
    { new: true }
  );
  if (updatedStatus.isDelivered) {
    res.status(200).json({
      success: true,
      updatedStatus: updatedStatus,
    });
  } else {
    return next(
      new customError("Failed to update the status of delivery", 400)
    );
  }
});
const deleteOrder = asyncHandler(async (req, res, next) => {
  if (!req.body._id) {
    return next(new customError("Request does not contain order id"));
  }
  const deleteStatus = await orders.findByIdAndDelete(req.body._id);

  if (deleteStatus) {
    res.status(200).json({ success: true });
  } else {
    return next(new customError("Unable to delete the order", 400));
  }
});

//PRODUCTS
const getAllProducts = asyncHandler(async (req, res, next) => {
  console.log(req.query.page);
  const pageSize = 2;
  const pageNumber = Number(req.query.page) || 1;
  const totalProductsCount = await products.countDocuments();
  const allProducts = await products
    .find({})
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  if (!allProducts) {
    return next(new CustomError("Please try again later", 404));
  }
  res.status(200).json({
    allProducts,
    pageNumber,
    pageSize: Math.ceil(totalProductsCount / pageSize),
  });
});
const createProduct = asyncHandler(async (req, res, next) => {
  console.log("requet received");
  const { image, price, description, category, name, inStock, brand } =
    req.body;

  const createProductStatus = await products.create({
    image,
    price,
    description,
    category,
    reviews: [],
    name,
    inStock,
    brand,
  });

  if (createProductStatus) {
    res.status(200).json(createProductStatus);
  } else {
    return next(new CustomError("Failed to update the product", 400));
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { _id } = req.body;
  if (!_id) {
    return next(new customError("Product id not found"));
  }
  const deleteStatus = await products.findByIdAndDelete(_id);

  if (deleteStatus) {
    res.status(200).json(deleteStatus);
  } else {
    return next(new CustomError("Unable to delete the product", 400));
  }
});

const modifyProduct = asyncHandler(async (req, res, next) => {
  const { image, price, description, category, name, inStock, brand } =
    req.body;

  const updatedProductStatus = await products.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image,
        price,
        description,
        category,
        name,
        inStock,
        brand,
      },
    },
    { new: true, runValidators: true }
  );

  console.log(updatedProductStatus);

  if (updatedProductStatus) {
    res.status(200).json(updatedProductStatus);
  } else {
    return next(new CustomError("Failed to update the product", 400));
  }
});

//USERS
const getAllUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await users.find({ isAdmin: false });
  if (allUsers) {
    res.status(200).json(allUsers);
  } else {
    return next(new customError("Error while fetching users", 400));
  }
});

const deactivateUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.body;
  if (!_id) {
    return next(new customError("Id not found", 404));
  }
  const deactivateStatus = await users.findByIdAndUpdate(_id, { active: true });
  console.log(deactivateStatus);
});

export {
  getAllOrders,
  modifyProduct,
  deleteOrder,
  getAllProducts,
  getAllUsers,
  modifyOrder,
  deleteProduct,
  createProduct,
  deactivateUser,
};
