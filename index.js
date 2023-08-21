require("dotenv").config();
require("./config/database").connect();
const express = require('express'),
    app = express(),
    routes = require('./routes/index'),
    port = process.env.API_PORT || 3000,
    cookieParser = require('cookie-parser');
app.use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(routes)
    .use(cookieParser());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
