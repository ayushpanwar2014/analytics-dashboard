import { getValue, setValue } from "../../config/redis.js";
import BarChartModel from "../models/bar-chart-model.js";

export const seedBarCharts = async (req, res, next) => {
    try {

        const barChartBoxRevenue = {
            title: "Profit Earned",
            color: "#8884d8",
            dataKey: "profit",
            chartData: [
                { name: "Sun", value: 4000 },
                { name: "Mon", value: 3000 },
                { name: "Tue", value: 2000 },
                { name: "Wed", value: 2780 },
                { name: "Thu", value: 1890 },
                { name: "Fri", value: 2390 },
                { name: "Sat", value: 3490 },
            ],
        };

        const barChartBoxVisit = {
            title: "Total Visit",
            color: "#FF8042",
            dataKey: "visit",
            chartData: [
                { name: "Sun", value: 4000 },
                { name: "Mon", value: 3000 },
                { name: "Tue", value: 2000 },
                { name: "Wed", value: 2780 },
                { name: "Thu", value: 1890 },
                { name: "Fri", value: 2390 },
                { name: "Sat", value: 3490 },
            ],
        };

        const charts = [barChartBoxRevenue, barChartBoxVisit];

        await BarChartModel.deleteMany({});

        const insertedCharts = await BarChartModel.insertMany(charts);

        res.status(201).json({
            success: true,
            message: "Bar charts seeded successfully",
            count: insertedCharts.length,
            data: insertedCharts,
        });

    } catch (error) {
        const err = {
            status: 401,
            message: error.message
        };
        next(err);
    }
};

export const getBarCharts = async (req, res, next) => {
    try {

        const cacheKey = "barCharts";

        //Check Redis first
        const cachedData = await getValue(cacheKey);

        if (cachedData) {
            console.log('barCharts cached');
            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }

        const [profitChart, visitChart] = await Promise.all([
            BarChartModel.findOne({ dataKey: "profit" }),
            BarChartModel.findOne({ dataKey: "visit" }),
        ]);

        const responseData = {
            profit: profitChart,
            visit: visitChart,
        };

        //Store in Redis
        await setValue(cacheKey, responseData, 60);

        res.status(200).json({
            success: true,
            data: responseData
        });

    } catch (error) {
        const err = {
            status: 401,
            message: error.message
        };
        next(err);
    }
};