import mongoose from "mongoose";

const chartDataSchema = new mongoose.Schema({
    name: {
        type: String, // Sun, Mon, Tue
        required: true,
    },
    visits: {
        type: Number,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
    },
});

const activitySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

const userAnalyticsSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        fullname: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },

        phone: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["verified", "pending", "blocked"],
            default: "pending",
        },

        chart: {
            data: [chartDataSchema],
        },

        activities: [activitySchema],
    },
    {
        timestamps: true,
    }
);

const UserAnalyticsModel = mongoose.model("UserAnalytics", userAnalyticsSchema);

export default UserAnalyticsModel;