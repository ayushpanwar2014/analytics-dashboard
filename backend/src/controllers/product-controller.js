import ProductModel from "../models/product-model.js";

export const seedProducts = async (req, res, next) => {
    try {

        const chartData = [
            { name: "Sun", visits: 4000, orders: 2400 },
            { name: "Mon", visits: 3000, orders: 1398 },
            { name: "Tue", visits: 2000, orders: 3800 },
            { name: "Wed", visits: 2780, orders: 3908 },
            { name: "Thu", visits: 1890, orders: 4800 },
            { name: "Fri", visits: 2390, orders: 3800 },
            { name: "Sat", visits: 3490, orders: 4300 },
        ];

        const activitiesTemplate = (title) => [
            {
                text: `Someone purchased ${title}`,
                time: "3 days ago",
            },
            {
                text: `${title} added to wishlist`,
                time: "1 week ago",
            },
            {
                text: `${title} reviewed by a customer`,
                time: "2 weeks ago",
            },
            {
                text: `${title} purchased again`,
                time: "1 month ago",
            },
        ];

        const products = [
            {
                img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
                title: "Playstation 5 Digital Edition",
                color: "white",
                producer: "Sony",
                price: "$250.99",
                createdAt: "01.02.2023",
                inStock: true,
            },
            {
                img: "https://www.pngmart.com/files/6/Dell-Laptop-PNG-Image.png",
                title: "Dell Laptop KR211822",
                color: "black",
                producer: "Dell",
                price: "$499.99",
                createdAt: "01.02.2023",
                inStock: true,
            },
            {
                img: "http://images.samsung.com/is/image/samsung/uk-led-tv-hg40ed670ck-hg40ed670ckxxu-001-front",
                title: "Samsung TV 4K SmartTV",
                color: "gray",
                producer: "Samsung",
                price: "$999.49",
                createdAt: "01.02.2023",
                inStock: true,
            },
            {
                img: "https://raylo.imgix.net/iphone-14-blue.png",
                title: "Apple Iphone 14 Pro Max",
                color: "white",
                producer: "Apple",
                price: "$799.49",
                createdAt: "01.02.2023",
                inStock: true,
            },
            {
                img: "https://www.signify.com/b-dam/signify/en-aa/about/news/2020/20200903-movie-night-essentials-popcorn-ice-cream-and-the-new-philips-hue-play-gradient-lightstrip/packaging-lighstrip.png",
                title: "Philips Hue Play Gradient",
                color: "rainbow",
                producer: "Philips",
                price: "$39.99",
                createdAt: "01.02.2023",
            },
            {
                img: "https://www.smartworld.it/wp-content/uploads/2019/09/High_Resolution_PNG-MX-Master-3-LEFT-GRAPHITE.png",
                title: "Logitech MX Master 3",
                color: "black",
                producer: "Logitech",
                price: "$59.49",
                createdAt: "01.02.2023",
                inStock: true,
            },
            {
                img: "https://www.pngarts.com/files/7/Podcast-Mic-PNG-Picture.png",
                title: "Rode Podcast Microphone",
                color: "gray",
                producer: "Rode",
                price: "$119.49",
                createdAt: "01.02.2023",
            },
            {
                img: "https://5.imimg.com/data5/SW/VM/MY-5774620/toshiba-split-ac-2-ton-3-star-rated-ras-24s3ks-500x500.png",
                title: "Toshiba Split AC 2",
                color: "white",
                producer: "Toshiba",
                price: "$899.99",
                createdAt: "01.02.2023",
                inStock: true,
            },
        ];

        const transformedProducts = products.map((product) => ({
            img: product.img,
            title: product.title,
            color: product.color,
            producer: product.producer,
            price: parseFloat(product.price.replace("$", "")),
            inStock: product.inStock ?? false,
            productId: `PROD-${Math.floor(Math.random() * 100000)}`,
            export: "Global",
            chart: {
                data: chartData,
            },
            activities: activitiesTemplate(product.title),
            createdAt: new Date(),
        }));

        await ProductModel.deleteMany({});

        const insertedProducts = await ProductModel.insertMany(
            transformedProducts
        );

        res.status(201).json({
            success: true,
            message: "Products seeded successfully",
            count: insertedProducts.length,
            data: insertedProducts,
        });

    } catch (error) {
        next({
            status: 500,
            message: error.message,
        });
    }
};

export const getProducts = async (req, res, next) => {
    try {

        const products = await ProductModel.find({}).lean();

        const formattedProducts = products.map((product) => ({
            id: product._id, // required for MUI DataGrid
            img: product.img,
            title: product.title,
            color: product.color,
            producer: product.producer,
            price: product.price,
            inStock: product.inStock,
            createdAt: product.createdAt,
        }));

        res.status(200).json({
            success: true,
            count: formattedProducts.length,
            data: formattedProducts,
        });

    } catch (error) {
        next({
            status: 500,
            message: error.message,
        });
    }
};