# Используйте образ Node.js с нужной версией
FROM node:16.15

# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json и установите зависимости
COPY package*.json ./
RUN npm install

# Копируйте исходный код приложения
COPY . .

# Запустите приложение
CMD [ "npm", "start" ]
