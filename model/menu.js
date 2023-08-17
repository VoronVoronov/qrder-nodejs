const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    domain: { type: String, default: null },
    status: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    expired_at: { type: Date, default: null },
});

module.exports = mongoose.model("menu", menuSchema);