const Menu = require("../model/menu"),
    { validationResult } = require('express-validator');

class MenusService{
    createMenu(data){
        return new Promise(async (res, rej) => {
            try {
                const { name } = data.body;
                if(!name && name !== null){
                    return res({
                        status: 400,
                        message: __("input_required"),
                    });
                }
                const menu = await Menu.create({
                    user_id: data.user.user_id,
                    name: name
                });
                return res({
                    status: 201,
                    message: __("menu_created"),
                    result: menu
                });
            } catch (err) {
                return rej(err);
            }
        });
    }
}

module.exports = new MenusService();
