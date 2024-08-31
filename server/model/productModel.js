import mongoose from "mongoose";
const reveiwSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  rating: {
    type: Number,
    required: true,
    default: true,
  },
  comment: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids", "Electronics", "Furniture", "Grocery"],
    },
    description: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reveiwSchema],
    reviewCounts: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const products = mongoose.model("products", productSchema);
export default products;
