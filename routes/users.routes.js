const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/users.controller'),
    {check} = require('express-validator'),
    middlewareAuth = require('../middleware/auth');

router.post('/users/register', [
    check('phone', 'phone_required').notEmpty(),
    check('email', 'email_required').isEmail().notEmpty(),
    check('password', 'password_required').notEmpty().isLength({min: 6}),
], UserController.createUser);
router.post('/users/login', [
    check('email', 'email_required').isEmail().notEmpty(),
    check('password', 'password_required').notEmpty().isLength({min: 6}),
], UserController.loginUser);
router.get("/users", middlewareAuth, UserController.getUser);

module.exports = router;
