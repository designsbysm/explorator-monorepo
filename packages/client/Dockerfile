FROM node:18.18.0-alpine

RUN npm install -g http-server

WORKDIR /app

ARG FONTAWESOME_NPM_TOKEN
RUN npm config set "@fortawesome:registry" https://npm.fontawesome.com/
RUN npm config set "//npm.fontawesome.com/:_authToken" ${FONTAWESOME_NPM_TOKEN}

COPY ./package.json .
RUN yarn install

COPY . .
COPY ./.env.docker .env
RUN yarn build

CMD http-server dist -p ${PORT_CLIENT}
