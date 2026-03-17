import UserAnalyticsModel from "../models/user-analytics-model.js";

export const seedUsersAnalytics = async (req, res, next) => {
    try {

        // Chart data from singleUser
        const chartData = [
            { name: "Sun", visits: 4000, clicks: 2400 },
            { name: "Mon", visits: 3000, clicks: 1398 },
            { name: "Tue", visits: 2000, clicks: 3800 },
            { name: "Wed", visits: 2780, clicks: 3908 },
            { name: "Thu", visits: 1890, clicks: 4800 },
            { name: "Fri", visits: 2390, clicks: 3800 },
            { name: "Sat", visits: 3490, clicks: 4300 },
        ];

        // Activities template
        const activitiesTemplate = (fullname) => [
            {
                text: `${fullname} purchased Playstation 5 Digital Edition`,
                time: "3 days ago",
            },
            {
                text: `${fullname} added 3 items into their wishlist`,
                time: "1 week ago",
            },
            {
                text: `${fullname} purchased Sony Bravia KD-32w800`,
                time: "2 weeks ago",
            },
            {
                text: `${fullname} reviewed a product`,
                time: "1 month ago",
            },
            {
                text: `${fullname} added 1 items into their wishlist`,
                time: "1 month ago",
            },
            {
                text: `${fullname} reviewed a product`,
                time: "2 months ago",
            },
        ];

        // Your userRows data
        const userRows = [
            {
                img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
                lastName: "Hubbard",
                firstName: "Eula",
                email: "kewez@gmail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Manning",
                firstName: "Stella",
                email: "comhuhmit@gmail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Greer",
                firstName: "Mary",
                email: "ujudokon@hotmail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Williamson",
                firstName: "Mildred",
                email: "tinhavabe@gmail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Gross",
                firstName: "Jose",
                email: "gobtagbes@yahoo.com",
                phone: "123 456 789",
                
            },
            {
                img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Sharp",
                firstName: "Jeremy",
                email: "vulca.eder@mail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Lowe",
                firstName: "Christina",
                email: "reso.bilic@gmail.com",
                phone: "123 456 789",
            },
            {
                img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Dean",
                firstName: "Garrett",
                email: "codaic@mail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Parsons",
                firstName: "Leah",
                email: "uzozor@gmail.com",
                phone: "123 456 789",
            },
            {
                img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Reid",
                firstName: "Elnora",
                email: "tuhkabapu@gmail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Dunn",
                firstName: "Gertrude",
                email: "gibo@gmail.com",
                phone: "123 456 789",
                verified: true,
            },
            {
                img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Williams",
                firstName: "Mark",
                email: "tic.harvey@hotmail.com",
                phone: "123 456 789",
            },
            {
                img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Cruz",
                firstName: "Charlotte",
                email: "ceuc@gmail.com",
                phone: "123 456 789",
            },
            {
                img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
                lastName: "Harper",
                firstName: "Sara",
                email: "bafuv@hotmail.com",
                phone: "123 456 789",
            },
            {
                img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
                lastName: "Griffin",
                firstName: "Eric",
                email: "ubi@gmail.com",
                phone: "123 456 789",
            },
        ];

        // Transform data according to schema
        const users = userRows.map((user) => {
            const fullname = `${user.firstName} ${user.lastName}`;

            return {
                img: user.img,
                username: `${user.firstName.toLowerCase()}${Math.floor(Math.random() * 100)}`,
                fullname: fullname,
                email: user.email,
                phone: user.phone,
                status: user.verified ? "verified" : "pending",
                chart: {
                    data: chartData,
                },
                activities: activitiesTemplate(fullname),
            };
        });

        // remove previous data (optional)
        await UserAnalyticsModel.deleteMany({});

        const insertedUsers = await UserAnalyticsModel.insertMany(users);

        res.status(201).json({
            success: true,
            message: "Users analytics seeded successfully",
            count: insertedUsers.length,
            data: insertedUsers,
        });

    } catch (error) {
        next(error);
    }
};