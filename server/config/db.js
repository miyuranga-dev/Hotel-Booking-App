import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/hotel-booking`,
            {
                serverSelectionTimeoutMS: 30000,
            }
        );

        console.log("✅ Database Connected");

    } catch (error) {
        console.error("❌ Database Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
