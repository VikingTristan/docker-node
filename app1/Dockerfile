FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY ./ ./code

ENV PORT=3000

EXPOSE $PORT
CMD [ "node", "server.js" ]