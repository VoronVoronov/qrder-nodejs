require("dotenv").config();
require("./config/database").connect();
const express = require('express'),
    app = express(),
    routes = require('./routes/index'),
    path = require('path'),
    port = process.env.API_PORT || 3000,
    i18n = require('i18n'),
    cookieParser = require('cookie-parser'),
    cors = require('cors')
app.use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(routes)
    .use(cookieParser())
    .use(cors({
        origin: 'http://localhost:5173',
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
        credentials: true
    }))
i18n.configure({
    locales: ['en', 'ru', 'kz'],
    defaultLocale: process.env.defaultLocale,
    directory: path.join(__dirname, 'lang'),
    register: global,
    autoReload: true,
  });
app.use(i18n.init);

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
