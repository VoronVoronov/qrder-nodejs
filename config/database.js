const mongoose = require("mongoose");
require('dotenv').config(); // Подключение пакета dotenv для чтения переменных окружения

const mongoURI = process.env.MONGO_URI;

exports.connect = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
      // Здесь можно продолжить с вашим кодом
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};