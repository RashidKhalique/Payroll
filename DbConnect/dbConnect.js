import mongoose from "mongoose";
const mongoUrl = "mongodb+srv://rashid:12345@hrpayroll.9v9yo.mongodb.net/";
console.log(mongoUrl);

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
