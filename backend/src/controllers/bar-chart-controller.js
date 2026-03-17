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
        next(error);
    }
};