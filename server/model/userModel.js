import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      maxLength: 10,
      minLength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    role: {
      type: String,
      enum: ["User", "Seller", "Admin"],
      default: "User",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    return next();
  }
});
userSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});
const users = new mongoose.model("users", userSchema);

export default users;
