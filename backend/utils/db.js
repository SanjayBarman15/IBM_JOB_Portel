import mongoose from "mongoose";

const connectDB = async () => {    
    try {
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGO_URI is not defined in environment variables");
            return;
        }
        await mongoose.connect(uri);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}

export default connectDB;