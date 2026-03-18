import { getValue, setValue } from "../../config/redis.js";
import BigChartModel from "../models/bigChartModel.js";

export const seedBigChart = async (req, res, next) => {
    try {

        await BigChartModel.deleteMany();

        const chartData = [
            { name: "Sun", books: 4000, clothes: 2400, electronic: 2400 },
            { name: "Mon", books: 3000, clothes: 1398, electronic: 2210 },
            { name: "Tue", books: 2000, clothes: 9800, electronic: 2290 },
            { name: "Wed", books: 2780, clothes: 3908, electronic: 2000 },
            { name: "Thu", books: 1890, clothes: 4800, electronic: 2181 },
            { name: "Fri", books: 2390, clothes: 3800, electronic: 2500 },
            { name: "Sat", books: 3490, clothes: 4300, electronic: 2100 },
        ];

        const result = await BigChartModel.insertMany(chartData);

        res.status(200).json({
            success: true,
            count: result.length,
            data: result,
        });

    } catch (error) {
        next({
            status: 500,
            message: error.message,
        });
    }
};

export const getBigChart = async (req, res, next) => {
    try {

        const cacheKey = "bigChart";

        //Check Redis cache
        const cachedData = await getValue(cacheKey);

        if (cachedData) {
            console.log("bigChart served from cache");

            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }

        const chartData = await BigChartModel.find().sort({ name: 1 });

        await setValue(cacheKey, chartData, 60);

        res.status(200).json({
            success: true,
            data: chartData,
        });

    } catch (error) {
        next({
            status: 500,
            message: error.message,
        });
    }
};