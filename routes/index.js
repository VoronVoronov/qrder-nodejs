const express = require('express'),
        router = express.Router(),
        usersRoutes = require('./users.routes'),
        i18n = require('i18n');

router.use("/api/:lang", (req, res, next) => {
    res.cookie('lang', req.params.lang);
    i18n.setLocale(req, req.params.lang);
    next(); // Продолжить обработку маршрутов с префиксом /api/:lang
}, usersRoutes);

module.exports = router;
