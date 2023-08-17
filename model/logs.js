const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
    user_id: { type: Number, default: null },
    ip: { type: String },
    date: { type: Date, default: Date.now },
    action: { type: String },
    url: { type: String },
    method: { type: String },
});

module.exports = mongoose.model("logs", logsSchema);