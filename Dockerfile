# Используйте образ Node.js с нужной версией
FROM node:16.15

# Установите рабочую директорию
WORKDIR /home/node/app

# Копируйте package.json и package-lock.json и установите зависимости
COPY package*.json ./
RUN npm install

# Копируйте исходный код приложения
COPY . .

# Создайте директорию для Certbot
RUN mkdir -p /var/www/html

# Запустите приложение
CMD [ "npm", "start" ]
