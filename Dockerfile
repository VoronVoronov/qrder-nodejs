# Используйте официальный образ Node.js
FROM node:16

# Установите версию npm
RUN npm install -g npm@8.2

# Установите рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируйте package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы проекта
COPY . .

# Откройте порт, на котором работает ваше приложение
EXPOSE 4001

# Команда для запуска приложения
CMD ["node", "index.js"]
