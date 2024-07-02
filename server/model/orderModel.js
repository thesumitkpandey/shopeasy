import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        requried: true,
      },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
    enum: ["cod", "prepaid"],
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "failed", "successful"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
});
const orders = mongoose.model("orders", orderSchema);
export default orders;
