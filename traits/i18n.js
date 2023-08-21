const i18n = require("i18n");
const path = require("path");

i18n.configure({
    locales: ['en', 'ru', 'kz'],
    defaultLocale: process.env.defaultLocale,
    directory: path.join(__dirname, '../lang/'),
    register: global,
    autoReload: true,
});

module.exports = i18n;
