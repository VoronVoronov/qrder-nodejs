const Menu = require("../model/menu");

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
    updateMenu(data){
        return new Promise(async (res, rej) => {
            try {
                const { name, domain } = data.body;
                if(!name && name !== null && !domain && domain !== null){
                    return res({
                        status: 400,
                        message: __("input_required"),
                    });
                }
                const menu = await Menu.findByIdAndUpdate(data.params.id, {
                    name: name,
                    domain: domain
                });
                return res({
                    status: 200,
                    message: __("menu_updated"),
                    result: menu
                });
            } catch (err) {
                return rej(err);
            }
        });
    }
    deleteMenu(data){
        return new Promise(async (res, rej) => {
            try {
                const menu = await Menu.findByIdAndDelete(data.params.id);
                return res({
                    status: 200,
                    message: __("menu_deleted"),
                    result: menu
                });
            } catch (err) {
                return rej(err);
            }
        });
    }
}

module.exports = new MenusService();
