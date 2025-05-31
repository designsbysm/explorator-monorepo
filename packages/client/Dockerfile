FROM node:20.19.2-alpine

WORKDIR /app

COPY ./package.json .
RUN yarn install

COPY . .
RUN yarn build

ARG PORT_CLIENT
CMD yarn preview --host --port ${PORT_CLIENT}
