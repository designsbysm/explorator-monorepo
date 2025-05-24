FROM node:20.19.2-alpine

RUN npm install -g http-server

WORKDIR /app

COPY ./package.json .
RUN yarn install

COPY . .
COPY ./.env.docker .env
RUN yarn build

CMD http-server dist -p ${PORT_CLIENT}
