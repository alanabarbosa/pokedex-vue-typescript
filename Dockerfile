FROM node:20.11.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_PORT=8080

EXPOSE 8080

CMD ["npm", "run", "dev"]
