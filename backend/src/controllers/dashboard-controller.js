import DashboardChartModel from "../models/dashboard-chart-model.js";

export const seedDashboardCharts = async (req, res, next) => {
    try {

        const chartBoxUser = {
            color: "#8884d8",
            icon: "/userIcon.svg",
            title: "Total Users",
            number: "11.238",
            dataKey: "users",
            percentage: 45,
            chartData: [
                { name: "Sun", value: 400 },
                { name: "Mon", value: 600 },
                { name: "Tue", value: 500 },
                { name: "Wed", value: 700 },
                { name: "Thu", value: 400 },
                { name: "Fri", value: 500 },
                { name: "Sat", value: 450 },
            ],
        };

        const chartBoxProduct = {
            color: "skyblue",
            icon: "/productIcon.svg",
            title: "Total Products",
            number: "238",
            dataKey: "products",
            percentage: 21,
            chartData: [
                { name: "Sun", value: 400 },
                { name: "Mon", value: 600 },
                { name: "Tue", value: 500 },
                { name: "Wed", value: 700 },
                { name: "Thu", value: 400 },
                { name: "Fri", value: 500 },
                { name: "Sat", value: 450 },
            ],
        };

        const chartBoxRevenue = {
            color: "teal",
            icon: "/revenueIcon.svg",
            title: "Total Revenue",
            number: "$56.432",
            dataKey: "revenue",
            percentage: -12,
            chartData: [
                { name: "Sun", value: 400 },
                { name: "Mon", value: 600 },
                { name: "Tue", value: 500 },
                { name: "Wed", value: 700 },
                { name: "Thu", value: 400 },
                { name: "Fri", value: 500 },
                { name: "Sat", value: 450 },
            ],
        };

        const chartBoxConversion = {
            color: "gold",
            icon: "/conversionIcon.svg",
            title: "Total Ratio",
            number: "2.6",
            dataKey: "ratio",
            percentage: 12,
            chartData: [
                { name: "Sun", value: 400 },
                { name: "Mon", value: 600 },
                { name: "Tue", value: 500 },
                { name: "Wed", value: 700 },
                { name: "Thu", value: 400 },
                { name: "Fri", value: 500 },
                { name: "Sat", value: 450 },
            ],
        };

        const charts = [
            chartBoxUser,
            chartBoxProduct,
            chartBoxRevenue,
            chartBoxConversion,
        ];

        await DashboardChartModel.deleteMany({});

        const insertedCharts = await DashboardChartModel.insertMany(charts);

        res.status(201).json({
            success: true,
            message: "Dashboard charts seeded successfully",
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