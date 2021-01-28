FROM node:14

WORKDIR /usr/src/app

COPY src/package*.json ./

RUN npm install

COPY src/ .

ENV PORT=3000

EXPOSE $PORT
CMD [ "node", "server.js" ]