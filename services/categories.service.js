const Categories = require("../model/categories");

class CategoriesService{
    createCategory(data){
        return new Promise(async (res, rej) => {
            try {
                const { name } = data.body;
                if(!name && name !== null){
                    return res({
                        status: 400,
                        message: __("input_required"),
                    });
                }
                const menu = await Categories.create({
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

module.exports = new CategoriesService();
