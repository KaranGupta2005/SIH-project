import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mysticsikkim";
  
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

export default connectDB;
