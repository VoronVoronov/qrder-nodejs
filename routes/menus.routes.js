const express = require('express'),
    router = express.Router(),
    MenuController = require('../controllers/menus.controller'),
    {check} = require('express-validator'),
    middlewareAuth = require('../middleware/auth');

router.post('/menus/create', middlewareAuth, [
    check('name', 'name_required').notEmpty(),
], MenuController.createMenu);

module.exports = router;
