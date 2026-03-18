import SessionModel from "../models/session-model.js";
import UserModel from "../models/user-model.js";
import { v2 as cloudinary } from 'cloudinary';

//setting age for cookies to be expire
export const accessTokenAge = 1000 * 60 * 15; // 15 mins
export const refreshTokenAge = 1000 * 60 * 60 * 24 * 7; // 7 days

//creating access Token and refresh Token
const authenticateUser = async (req, res, user) => {

    //generating session in user Model method
    const session = await user.createSession({ ip: req.ip, userAgent: req.headers["user-agent"] });

    //create accesstoken with jwt in user Model method
    const accessToken = await user.createAccessToken(session._id);

    //create refreshtoken with jwt in user Model method
    const refreshToken = await user.createRefreshToken(session._id);

    //setting cookie becuse more security rather then saving in localstorage

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: accessTokenAge,
        path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: refreshTokenAge,
        path: '/',
    }).status(200).json({
        success: true,
        msg: "Logged In",
    });

};

//register
export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Checking User Exist
        const userExist = await UserModel.findOne({ email: email });

        if (userExist) {
            return res.status(409).json({
                success: false,
                message: "User already exists!"
            });
        }

        //Creating User
        const createUser = await UserModel.create({
            email: email,
            password: password
        });

        // creating access token and refresh token and sending to client
        await authenticateUser(req, res, createUser);

    } catch (err) {
        const error = {
            status: 401,
            message: "Not Authenticated"
        }
        next(error);
    }
};

//login
export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        //checking if user exist in database
        const userExist = await UserModel.findOne({ email: email });

        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }

        //Comaparing User Password
        const validPassword = await userExist.comparePassword(password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }
        
        // creating access token and refresh token and sending to client
        await authenticateUser(req, res, userExist);

    } catch (err) {
        const error = {
            status: 401,
            message: "Not Authenticated"
        }
        next(error);
    }
};

//logout
export const logout = async (req, res, next) => {
    try {

        res.clearCookie('accessToken')
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/',
        }).status(200).json({ success: true, msg: "Logout SuccessFully!" });

    } catch (err) {

        const error = {
            status: 401,
            message: "Not Authorized"
        }
        next(error);
    }
};

//authenticated user
export const authUser = async (req, res, next) => {
    try {

        const { userID } = req.user;

        const user = await UserModel
            .findById(userID)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found"
            });
        }

        const userCopyData = {
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        res.status(200).json({
            success: true,
            data: userCopyData,
        });

    } catch (err) {
        next({
            status: 401,
            message: "Unauthorized User"
        });
    }
};