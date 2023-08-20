const Logs = require("../model/logs");

const logsMiddleware = (req, res) => {
    const logEntry = new Logs({
        ip: req.ip,
        date: new Date(),
        body: JSON.stringify(req.body),
        url: req.url,
        lang: req.params.lang,
        method: req.method,
    });
    try {
        logEntry.save().then(() => {
            console.log("Log entry saved to database");
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = logsMiddleware;
