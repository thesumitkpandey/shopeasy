import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import productRoute from "./route/productRoute.js";
import userRoute from "./route/userRoute.js";
const app = express();

connectDB();

//Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
