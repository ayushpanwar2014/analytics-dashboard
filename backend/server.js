import express from 'express';
import { dbConnected } from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { errorMiddlewares } from './middlewares/error-middlewares.js';
import { securityMiddleware } from './middlewares/security-middlewares.js';
import { connectCloudinary } from './config/cloudinary.js';
import initRedisClient from './config/redis.js';
import User_Router from './src/routes/user-routes.js';
import TopDealUserRouter from './src/routes/topDealUser-routes.js';
import UserAnalyticsRouter from './src/routes/userAnalytics-routes.js';
import DashboardChartsRouter from './src/routes/dashboard-chart-routes.js';
import BarChartsRouter from './src/routes/bar-chart-routes.js';
import ProductsRouter from './src/routes/products-routes.js';
import dotenv from 'dotenv';

dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 7060;
connectCloudinary();

// Calling advanced security middleware
securityMiddleware(app);

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

//middleware to get ip address of the user network
app.set('trust proxy', false);

app.use('/api/user', User_Router);
app.use("/api/top-deal", TopDealUserRouter);
app.use("/api/user-analytics", UserAnalyticsRouter);
app.use("/api/dashboard-charts", DashboardChartsRouter);
app.use("/api/bar-charts", BarChartsRouter);
app.use("/api/product", ProductsRouter);

//error middleware
app.use(errorMiddlewares);

const initAPP = async () => {
    await dbConnected();
    await initRedisClient();
}

initAPP().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT:-${PORT}`);
    })
}).catch((err) => {
    console.error('Database Connection Failed!', err);
})
