FROM node:latest

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

RUN npm run build

ENV NODE_ENV=PR

EXPOSE 3000

CMD ["npm", "start"]
