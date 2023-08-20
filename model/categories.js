const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    menu_id: { type: String },
    name: { type: String },
    description: { type: String },
    image: { type: String }
});

module.exports = mongoose.model("categories", CategoriesSchema);
