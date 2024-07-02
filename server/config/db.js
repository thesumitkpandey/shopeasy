import mongoose from "mongoose";
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connection passed : ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection failed : ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;
