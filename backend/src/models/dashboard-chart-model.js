import mongoose from "mongoose";

const chartDataSchema = new mongoose.Schema(
    {
        name: {
            type: String, // Sun, Mon, Tue...
            required: true,
        },

        value: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const dashboardChartSchema = new mongoose.Schema(
    {
        color: {
            type: String,
            required: true,
        },

        icon: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        number: {
            type: String,
            required: true,
        },

        dataKey: {
            type: String,
            required: true,
            enum: ["users", "products", "revenue", "ratio"],
        },

        percentage: {
            type: Number,
            required: true,
        },

        chartData: [chartDataSchema],
    },
    {
        timestamps: true,
    }
);

const DashboardChartModel = mongoose.model("DashboardChart", dashboardChartSchema);

export default DashboardChartModel;