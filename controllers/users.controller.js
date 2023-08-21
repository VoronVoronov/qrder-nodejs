const UsersService = require('../services/users.service'),
    i18n = require("../traits/i18n");


class UsersController {
    async createUser(req, res) {
        try {
            let user = await UsersService.createUser(req);
            if (user.status === 201) return res.status(201).json(user);
            else return res.status(user.status).send({
                message: user.message,
            });
        } catch (err) {
            return res.status(500).send({
                message: i18n.__("system_error"),
                result: err
            });
        }
    }
    async loginUser(req, res) {
        try {
            let user = await UsersService.loginUser(req);
            if (user.status === 200) return res.status(200).json(user);
            else return res.status(user.status).send({
                message: user.message,
                status: user.status
            });
        } catch (err) {
            return res.status(500).send({
                message: i18n.__("system_error")
            });
        }
    }
    async getUser(req,res){
        try {
            if(req.user) return res.status(200).json(req.user);
        } catch (err) {
            return res.status(500).send({
                message: i18n.__("system_error")
            });
        }
    }
}

module.exports = new UsersController();
