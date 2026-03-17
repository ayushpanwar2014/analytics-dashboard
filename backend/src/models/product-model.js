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
    orders: {
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

const productSchema = new mongoose.Schema(
    {
        img: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        color: {
            type: String,
        },

        producer: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },

        inStock: {
            type: Boolean,
            default: true,
        },

        productId: {
            type: String,
            unique: true,
            required: true,
        },

        export: {
            type: String,
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

const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;