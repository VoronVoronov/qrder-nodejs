const UsersService = require('../services/users.service'),
    { validationResult } = require('express-validator');

class UsersController {
    async createUser(req, res) {
        try {
            // const errors = validationResult(req.body);
            // if (!errors.isEmpty()) {
            //     return res({
            //         status: 400,
            //         message: errors.array()
            //     });
            // }
            let user = await UsersService.createUser(req);
            if (user) return res.status(201).json(user);
            else return res.status(500).send({
                message: user.message,
            });
        } catch (err) {
            return res.status(500).send({
                message: __("system_error"),
                result: err
            });
        }
    }
    async loginUser(req, res) {
        try {
            // const errors = validationResult(req.body);
            // if (!errors.isEmpty()) {
            //     return res({
            //         status: 400,
            //         message: errors.array()
            //     });
            // }
            let user = await UsersService.loginUser(req);
            if (user) return res.status(200).json(user);
            else return res.status(500).send({
                message: user.message,
            });
        } catch (err) {
            return res.status(500).send({
                message: __("system_error"),
                result: err
            });
        }
    }
    async getUser(req,res){
        try {
            if(req.user) return res.status(200).json(req.user);
        } catch (err) {
            return res.status(500).send({
                message: __("system_error"),
                result: err
            });
        }
    }
}

module.exports = new UsersController();
