const Logs = require("../model/logs");

const logsMiddleware = (req, res) => {
    const logEntry = new Logs({
        ip: req.ip,
        date: new Date(),
        body: JSON.stringify(req.body),
        url: req.url,
        lang: req.params.lang,
        method: req.method,
        status: res.statusCode,
    });
    try {
        logEntry.save().then(() => {
            console.log("Log entry saved to database ID " + logEntry._id + "!");
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = logsMiddleware;
