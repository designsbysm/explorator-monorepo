FROM node:18.18.0-alpine

WORKDIR /app

COPY ./package.json .
RUN yarn install

COPY . .

CMD yarn start
