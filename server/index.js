import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use(errorMiddleware);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
