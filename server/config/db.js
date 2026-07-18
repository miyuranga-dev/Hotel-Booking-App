import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Mongo URI:", process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
        });

        console.log("✅ Database Connected");

    } catch (error) {
        console.error("❌ Database Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
