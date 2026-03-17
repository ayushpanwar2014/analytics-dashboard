import mongoose from "mongoose";

const topDealUserSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        amount: {
            type: Number, // store as number for sorting and calculations
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const TopDealUser = mongoose.model("TopDealUser", topDealUserSchema);

export default TopDealUser;