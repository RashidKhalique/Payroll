import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoUrl = process.env.MONGODB_URI

const dbConnect = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default dbConnect;
