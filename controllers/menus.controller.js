const MenusService = require('../services/menus.service'),
    { validationResult } = require('express-validator');

class MenusController {
    async createMenu(req, res) {
        try {
            let menu = await MenusService.createMenu(req);
            if (menu.status === 201) return res.status(201).json(menu);
            else return res.status(menu.status).send({
                message: menu.message,
            });
        } catch (err) {
            return res.status(500).send({
                message: __("system_error"),
                errors: err
            });
        }
    }
    async updateMenu(req, res) {
        try {
            let menu = await MenusService.updateMenu(req);
            if (menu.status === 200) return res.status(200).json(menu);
            else return res.status(menu.status).send({
                message: menu.message,
            });
        } catch (err) {
            return res.status(500).send({
                message: __("system_error"),
                errors: err
            });
        }
    }
    async deleteMenu(req, res) {
        try {
            let menu = await MenusService.deleteMenu(req);
            if (menu.status === 200) return res.status(200).json(menu);
            else return res.status(menu.status).send({
                message: menu.message,
            });
        } catch (err) {
            return res.status(500).send({
                message: __("system_error"),
                errors: err
            });
        }
    }
}

module.exports = new MenusController();
