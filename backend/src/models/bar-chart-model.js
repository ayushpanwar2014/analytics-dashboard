import mongoose from "mongoose";

const barChartDataSchema = new mongoose.Schema(
    {
        name: {
            type: String, // Sun, Mon, Tue
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const barChartSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        color: {
            type: String,
            required: true,
        },

        dataKey: {
            type: String,
            required: true,
            enum: ["profit", "visit"],
        },

        chartData: [barChartDataSchema],
    },
    {
        timestamps: true,
    }
);

const BarChartModel = mongoose.model("BarChart", barChartSchema);

export default BarChartModel;