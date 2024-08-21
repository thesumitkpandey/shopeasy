import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import orderRoute from "./route/orderRoute.js";
import adminRoute from "./route/adminRoute.js";
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
