import mongoose, { mongo } from "mongoose";
const itemsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    items: [itemsSchema],
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash_on_delivery", "paypal"],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "failed", "successful"],
      default: "pending",
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    totalOrderValue: {
      type: Number,
      required: true,
    },
    address: {
      locality: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
        maxLength: 6,
        minLength: 6,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        maxLength: 25,
      },
    },
  },
  {
    timestamps: true,
  }
);
const orders = mongoose.model("orders", orderSchema);
export default orders;
