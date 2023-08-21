const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/users.controller'),
    {check} = require('express-validator'),
    middlewareAuth = require('../middleware/auth'),
    validate = require('../traits/validate'),
    i18n = require("../traits/i18n");


router.post('/users/register', validate([
    check('phone', i18n.__('phone_required')).notEmpty(),
    check('email', i18n.__('email_required')).isEmail().notEmpty(),
    check('password', i18n.__('password_required')).notEmpty().isLength({min: 6}),
]), UserController.createUser);
router.post('/users/login', validate([
    check('email', i18n.__('email_required')).isEmail().notEmpty(),
    check('password', i18n.__('password_required')).notEmpty().isLength({min: 6}),
]), UserController.loginUser);
router.get("/users", middlewareAuth, UserController.getUser);

module.exports = router;
