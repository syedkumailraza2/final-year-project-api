import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();  


// Connect MongoDB
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log(`✅ Database Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error("❌ Database Connection Error:", error);
        process.exit(1);  // Exit process on failure
    }
};

export default connectDB;
