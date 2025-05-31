FROM node:20.19.2-alpine

RUN yarn global add http-server

WORKDIR /app

COPY ./package.json .
RUN yarn install

COPY . .
RUN yarn build

ARG PORT_CLIENT
# CMD yarn preview --host --port ${PORT_CLIENT}
CMD http-server dist --port ${PORT_CLIENT} --proxy http://localhost:${PORT_CLIENT}?
