const User = require("../model/user"),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    { validationResult } = require('express-validator');
class UsersService {
    createUser(data) {
        return new Promise(async (res, rej) => {
            try {
                const { phone, email, password } = data.body;
                const oldUser = await User.findOne({ email });
                if (oldUser) {
                    return res({
                        status: 409,
                        message: __("user_already_exist"),
                    });
                }
                const encryptedPassword = await bcrypt.hash(password, 7);
                const user = await User.create({
                    phone: phone,
                    email: email.toLowerCase(), 
                    password: encryptedPassword,
                    registration_ip: data.ip,
                });
                const token = await jwt.sign(
                    { 
                        user_id: user._id, 
                        email 
                    },
                        process.env.TOKEN_KEY,
                    {
                        expiresIn: process.env.TOKEN_EXPIRY,
                    }
                );
                user.token = token;
                return res({
                    status: 201,
                    message: __("user_created"),
                    result: user
                });
            } catch (err) {
                return rej(err); // или какая-то другая обработка ошибки
            }
        });
    }
    loginUser(data) {
        return new Promise(async (res, rej) => {
            try {
                const { email, password } = data.body;
                const user = await User.findOne({ email });
                if (!user) {
                    return res({
                        status: 404,
                        message: __("user_not_found"),
                    });
                }
                if (user && (await bcrypt.compare(password, user.password))) {
                    const token = jwt.sign(
                        { 
                          user_id: user._id, 
                          email 
                        },
                          process.env.TOKEN_KEY,
                        {
                          expiresIn: process.env.TOKEN_EXPIRY,
                        }
                    );
                    user.last_login_date = new Date();
                    user.last_login_ip = data.ip;
                    await user.save();
                    user.token = token;
                    return res({
                        status: 200,
                        message: __("logged_in"),
                        token: token
                    });
                }
                return res({
                    status: 400,
                    message: __("invalid_credentials"),
                });
            } catch (err) {
                return rej(err); // или какая-то другая обработка ошибки
            }
        });        
    }
}

module.exports = new UsersService();
