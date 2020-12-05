FROM node:latest

COPY . /var/app

WORKDIR /var/app

RUN yarn install

CMD yarn dev
