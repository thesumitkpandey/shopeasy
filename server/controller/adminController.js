import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import customError from "../middleware/CustomError.js";
import orders from "../model/orderModel.js";
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
const createProduct = asyncHandler(async (req, res, next) => {});
export { getAllOrders, modifyOrder, deleteOrder, createProduct };
