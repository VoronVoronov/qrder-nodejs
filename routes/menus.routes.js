const express = require('express'),
    router = express.Router(),
    MenuController = require('../controllers/menus.controller'),
    {check} = require('express-validator'),
    middlewareAuth = require('../middleware/auth'),
    validate = require('../traits/validate'),
    i18n = require("../traits/i18n");

router.post('/menus/create', middlewareAuth, validate([
    check('name', i18n.__('name_required')).notEmpty(),
]), MenuController.createMenu);

router.put('/menus/update/:id', middlewareAuth, validate([
    check('name', i18n.__('name_required')).notEmpty(),
]), MenuController.updateMenu);

router.get('/menus', middlewareAuth, MenuController.getMenus);

router.get('/menus/:id', middlewareAuth, MenuController.getMenuById);

router.delete('/menus/delete/:id', middlewareAuth, MenuController.deleteMenu);

module.exports = router;
