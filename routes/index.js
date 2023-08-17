const express = require('express'),
        router = express.Router(),
        usersRoutes = require('./users.routes'),
        menusRoutes = require('./menus.routes'),
        i18n = require('i18n');

router.use("/api/:lang", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    i18n.setLocale(req, req.params.lang);
    next(); // Продолжить обработку маршрутов с префиксом /api/:lang
}, usersRoutes, menusRoutes);


module.exports = router;
