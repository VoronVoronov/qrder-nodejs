const User = require("../model/user"),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    i18n = require("../traits/i18n");

class UsersService {
    createUser(data) {
        return new Promise(async (res, rej) => {
            try {
                const { phone, email, password, confirmPassword } = data.body;
                if(!phone && !email && !password && !confirmPassword && phone === null && email === null && password === null && password !== confirmPassword){
                    return res({
                        status: 400,
                        message: i18n.__("input_required"),
                    });
                }
                const oldUser = await User.findOne({ email });
                if (oldUser) {
                    return res({
                        status: 409,
                        message: i18n.__("user_already_exist"),
                    });
                }
                const encryptedPassword = await bcrypt.hash(password, 7);
                const user = await User.create({
                    phone: phone,
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                    registration_ip: data.ip,
                });
                user.token = await jwt.sign(
                    {
                        user_id: user._id,
                        email
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: process.env.TOKEN_EXPIRY,
                    }
                );
                return res({
                    status: 201,
                    message: i18n.__("user_created"),
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
                const { email, password, remember_me } = data.body;
                if(!email && !password && email === null && password === null){
                    return res({
                        status: 400,
                        message: i18n.__("input_required"),
                    });
                }
                const user = await User.findOne({ email });
                if (!user) {
                    return res({
                        status: 404,
                        message: i18n.__("user_not_found"),
                    });
                }
                let expiresIn = process.env.TOKEN_EXPIRY;
                if(remember_me){
                    expiresIn = process.env.TOKEN_EXPIRY_REMEMBER_ME;
                }
                if (user && (await bcrypt.compare(password, user.password))) {
                    const token = jwt.sign(
                        {
                          user_id: user._id,
                          email
                        },
                          process.env.TOKEN_KEY,
                        {
                          expiresIn: expiresIn,
                        }
                    );
                    user.last_login_date = new Date();
                    user.last_login_ip = data.ip;
                    await user.save();
                    user.token = token;
                    return res({
                        status: 200,
                        message: i18n.__("logged_in"),
                        token: token
                    });
                }
                return res({
                    status: 400,
                    message: i18n.__("invalid_credentials"),
                });
            } catch (err) {
                return rej(err); // или какая-то другая обработка ошибки
            }
        });
    }
}

module.exports = new UsersService();
