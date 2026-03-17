import mongoose from "mongoose";

const bigChartSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        books: {
            type: Number,
            required: true,
        },
        clothes: {
            type: Number,
            required: true,
        },
        electronic: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const BigChartModel = mongoose.models.BigChart || mongoose.model("BigChart", bigChartSchema);

export default BigChartModel;