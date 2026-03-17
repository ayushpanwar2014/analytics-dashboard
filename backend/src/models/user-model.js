import mongoose from 'mongoose';
import argon2 from 'argon2'
import jwt from 'jsonwebtoken';
import SessionModel from './session-model.js';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
},
    { timestamps: true }
);

// Strong hashing options for argon2
const options = {
    type: argon2.argon2id,         // Best all-around (resists GPU & side-channel attacks)
    memoryCost: 2 ** 16,          // 64 MB
    timeCost: 5,                 // Iterations (increase for more security)
    parallelism: 2              // Number of threads (adjust per CPU core)
}

// Hashing Password pre method before saving in database
UserSchema.pre('save', async function (next) {

    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await argon2.hash(user.password, options);
        user.password = hashedPassword;
        next()


    } catch (error) {
        next(error)
    }
})

// Updating new Password
UserSchema.pre('findOneAndUpdate', async function (next) {

    const update = this.getUpdate();

    if (!update || !update.password) {
        return next();
    }
    try {

        const hashedPassword = await argon2.hash(update.password, options);

        update.password = hashedPassword;
        this.setUpdate(update);
        next()

    } catch (error) {
        next(error)
    }

})

//new skill Hybrid Authentication method
//making AccessToken and sending to the client side 
UserSchema.methods.createAccessToken = async function (sessionId) {

    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email,
            session: sessionId,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: 900 // 15min
            }
        )

    } catch (error) {
        console.log(error);

    }
}

//making RefreshToken and sending to the client side 
UserSchema.methods.createRefreshToken = async function (sessionId) {

    try {

        return jwt.sign({
            session: sessionId,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24 * 7 // 7 days
            }
        )

    } catch (error) {
        console.log(error);
    }
}

//new skill instances method
//making session and storing to the database
UserSchema.methods.createSession = async function ({ ip, userAgent }) {

    try {
        const session = await SessionModel.create({
            userID: this._id,
            userAgent: userAgent,
            ip: ip
        })

        return session;

    } catch (error) {
        console.log(error);

    }
}

//Comparing Password when login
UserSchema.methods.comparePassword = async function (password) {

    return await argon2.verify(this.password, password);

}

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;