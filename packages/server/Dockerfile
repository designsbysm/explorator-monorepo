FROM node:20.19.2-alpine

WORKDIR /app

COPY ./package.json .
RUN yarn install

COPY . .
COPY ./.env.docker .env

CMD yarn start
