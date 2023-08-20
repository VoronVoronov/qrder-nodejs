const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
    ip: { type: String },
    date: { type: Date, default: Date.now },
    body: { type: String },
    url: { type: String },
    lang: { type: String },
    method: { type: String },
});

module.exports = mongoose.model("logs", logsSchema);
