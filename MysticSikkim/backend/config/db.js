import mongoose from "mongoose";

async function connectDB(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
};

connectDB()
.then(()=>{
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error);
});

export default connectDB;
