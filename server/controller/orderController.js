import asyncHandler from "../middleware/asyncHandler.js";
import CustomError from "../middleware/CustomError.js";
import customError from "../middleware/CustomError.js";
import orders from "../model/orderModel.js";
import users from "../model/userModel.js";

//THERE ARE MULTIPLE BUGS IN CREATE ORDER
const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shipping, totalPrice, paymentMethod } = req.body;
  if (orderItems.length === 0) {
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
    userId: req.loggedInUser._id,
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
  const allUserOrders = await orders.find({ userId: req.loggedInUser._id });
  if (allUserOrders) {
    res.status(200).json({
      success: true,
      orders: allUserOrders,
    });
  } else {
    return next(new CustomError("No orders found", 404));
  }
});

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
const modifyPaymentStatus = asyncHandler(async (req, res, next) => {
  const isSuccessful = await orders.findByIdAndUpdate(req.loggedInUser._id, {
    paymentStatus: "successful",
  });
  if (isSuccessful) {
    res.status(200).json({
      success: true,
    });
  } else {
    await orders.findByIdAndUpdate(users._id, { paymentStatus: "failed" });
    res.status(400).json({ success: false });
  }
});
export { createOrder, getMyOrder, getOrderById };
