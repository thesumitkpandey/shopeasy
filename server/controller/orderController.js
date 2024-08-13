import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import customError from "../middleware/CustomError.js";
import orders from "../model/orderModel.js";
import users from "../model/userModel.js";

//THERE ARE MULTIPLE BUGS IN CREATE ORDER
const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shipping, totalPrice, paymentMethod } = req.body;
  if (orderItems.length < 0) {
    return next(new CustomError("Order items list is emptyy", 404));
  }

  const newOrder = await orders.create({
    items: orderItems.map((p) => ({
      productId: p._id,
      name: p.name,
      image: p.image,
      quantity: p.quantity,
      price: p.price,
    })),
    userId: req.user._id,
    paymentMethod: paymentMethod,
    totalOrderValue: totalPrice,
    address: {
      locality: shipping.locality,
      pincode: shipping.pincode,
      state: shipping.state,
      city: shipping.city,
    },
  });
  if (!newOrder) {
    return next(
      new CustomError("unable to create order please try again", 400)
    );
  } else {
    res.status(200).json({
      success: true,
      orderDetails: newOrder,
    });
  }
});

const getMyOrder = asyncHandler(async (req, res, next) => {
  const allUserOrders = await orders.find({ userId: users._id });
  if (allUserOrders > 0) {
    res.status(200).json({
      success: true,
      orders: allUserOrders,
    });
  } else {
    return next(new CustomError("No orders found", 404));
  }
});
const modifyOrder = asyncHandler(async (req, res, next) => {});

//CONTROLLERS FOR ADMIN
const getAllOrders = asyncHandler(async (req, res, next) => {});
const getOrderById = asyncHandler(async (req, res, next) => {
  const targetOrder = await orders.findById(req.params.id);
  if (!targetOrder) {
    return next(new customError("Order with this id not found", 404));
  } else {
    res.status(200).json({
      success: true,
      orderInfo: targetOrder,
    });
  }
});
export { createOrder, getAllOrders, getMyOrder, modifyOrder, getOrderById };
