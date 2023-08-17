# Используйте образ Node.js с нужной версией
FROM node:16.15

# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json и установите зависимости
COPY package*.json ./
RUN npm install

# Копируйте исходный код приложения
COPY . .

# Создайте директорию для Certbot
RUN mkdir -p /var/www/certbot

# Запустите приложение
CMD [ "mkdir", "/var/www/certbot" ]
CMD [ "npm", "start" ]
