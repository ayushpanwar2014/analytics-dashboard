import jwt from "jsonwebtoken";
import SessionModel from "../src/models/session-model.js";
import UserModel from "../src/models/user-model.js";
import { accessTokenAge, refreshTokenAge } from "../src/controllers/user-controllers.js";

//decrypt access or refresh token
const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export const verifyToken = async (req, res, next) => {

    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    req.user = null;

    if (!accessToken && !refreshToken) {
        return res.status(401).send({ success: false, msg: "Not Logged In" });
    }
    else if (!refreshToken && accessToken) {

        //deleting in the database if no refreshToken

        const sessionID = decodeToken(accessToken);

        await SessionModel.findByIdAndDelete(sessionID.session);

        //clearing accessToken cookie too in frontend
        return res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            path: '/'
        }).status(200).json({ success: true, msg: "Logout SuccessFully!" });
    }
    else if (accessToken && refreshToken) {

        try {

            const sessionID = decodeToken(refreshToken);

            const session = await SessionModel.findById(sessionID.session);

            // if not in database delete cookie in frontend
            if (!session) {

                res.clearCookie('accessToken')
                return res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    path: '/',
                }).status(200).json({ success: true, msg: "Logout SuccessFully!" });
            }

        } catch (error) {
            return res.status(401).json({ success: false, msg: 'Invalid refresh token' });
        }
    }

    try {

        if (accessToken) {

            try {
                const verifyAccessToken = decodeToken(accessToken);
                req.user = verifyAccessToken;
                return next();
            } catch (err) {

                if (err.name === "TokenExpiredError" && refreshToken) {

                    const decoded = decodeToken(refreshToken);

                    const session = await SessionModel.findById(decoded.session);

                    if (!session) {
                        return res.status(401).json({ success: false });
                    }

                    const user = await UserModel.findById(session.userID);

                    const newAccessToken = await user.createAccessToken(session._id);
                    const newRefreshToken = await user.createRefreshToken(session._id);

                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "None",
                        maxAge: accessTokenAge,
                        path: "/",
                    });

                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "None",
                        maxAge: refreshTokenAge,
                        path: "/",
                    });

                    req.user = {
                        userID: user._id,
                        session: session._id,
                    };

                    return next();
                }

                return res.status(401).json({ success: false, msg: "Invalid access token" });
            }
        }
        else if (refreshToken) {

            try {

                const decoded = decodeToken(refreshToken);

                const session = await SessionModel.findById(decoded.session);

                if (!session) {
                    return res.status(401).json({
                        success: false,
                        msg: "Invalid refresh token"
                    });
                }

                const user = await UserModel.findById(session.userID);

                if (!user) {
                    return res.status(401).json({
                        success: false,
                        msg: "User not found"
                    });
                }

                // delete old session
                await SessionModel.findByIdAndDelete(session._id);

                // create new session
                const newSession = await user.createSession({
                    ip: req.ip,
                    userAgent: req.headers["user-agent"]
                });

                const newAccessToken = await user.createAccessToken(newSession._id);
                const newRefreshToken = await user.createRefreshToken(newSession._id);

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: accessTokenAge,
                    path: "/",
                });

                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: refreshTokenAge,
                    path: "/",
                });

                req.user = {
                    userID: user._id,
                    session: newSession._id
                };

                return next();

            } catch (err) {

                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    path: "/",
                });

                return res.status(401).json({
                    success: false,
                    msg: "Invalid refresh token"
                });

            }
        }
        else {
            // return next()
            return res.status(400).send({ success: false, msg: "Not Logged In" });
        }

    } catch (err) {

        const error = {
            status: 401,
            message: "Unauthorized Person"
        }
        next(error)
    }
}

export const verifyRefreshTokenAndLogout = async (req, res, next) => {

    const sessionID = req.user._id;
    const sessionID2 = req.user.session;

    try {

        if (sessionID || sessionID2) {

            const checkSessionId = await SessionModel.findById(sessionID || sessionID2);

            if (!checkSessionId) return res.status(401).json({ success: false, msg: "Unauthorized Person" });

            await SessionModel.findByIdAndDelete(checkSessionId._id);

            console.log('Session deleted');

            next();

        }
        else {
            return res.status(401).json({ success: false, msg: "Unauthorized Person" });
        }


    } catch (err) {

        const error = {
            status: 401,
            message: "Unauthorized Person"
        }
        next(error)

    }

}