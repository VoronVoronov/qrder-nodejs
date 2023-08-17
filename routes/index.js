const express = require('express'),
        router = express.Router(),
        usersRoutes = require('./users.routes'),
        menusRoutes = require('./menus.routes'),
        i18n = require('i18n');

router.use("/api/:lang", (req, res, next) => {
    i18n.setLocale(req, req.params.lang);
    next(); // Продолжить обработку маршрутов с префиксом /api/:lang
}, usersRoutes, menusRoutes);


module.exports = router;
