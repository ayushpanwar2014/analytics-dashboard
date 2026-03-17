import TopDealUser from "../models/top-deal-users-model.js";

export const seedTopDealUsers = async (req, res, next) => {
    try {

        const users = [
            {
                img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
                username: "Elva McDonald",
                email: "elva@gmail.com",
                amount: "3.668",
            },
            {
                img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
                username: "Linnie Nelson",
                email: "linnie@gmail.com",
                amount: "3.256",
            },
            {
                img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
                username: "Brent Reeves",
                email: "brent@gmail.com",
                amount: "2.998",
            },
            {
                img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
                username: "Adeline Watson",
                email: "adeline@gmail.com",
                amount: "2.512",
            },
            {
                img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
                username: "Juan Harrington",
                email: "juan@gmail.com",
                amount: "2.134",
            },
            {
                img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
                username: "Augusta McGee",
                email: "augusta@gmail.com",
                amount: "1.932",
            },
            {
                img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
                username: "Angel Thomas",
                email: "angel@gmail.com",
                amount: "1.560",
            },
        ];

        await TopDealUser.deleteMany({});

        const insertedUsers = await TopDealUser.insertMany(users);

        res.status(201).json({
            success: true,
            message: "Top deal users inserted successfully",
            data: insertedUsers,
        });

    } catch (error) {
        const err = {
            status: 401,
            message: error.message
        };
        next(err);
    }
};

export const getTopDealUsers = async (req, res, next) => {
    try {

        const users = await TopDealUser
            .find({})
            .sort({ amount: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });

    } catch (error) {
        const err = {
            status: 500,
            message: error.message
        };
        next(err);
    }
};