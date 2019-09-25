FROM node:8.9.0-alpine

MAINTAINER "HMCTS Team <https://github.com/hmcts>"
LABEL maintainer = "HMCTS Team <https://github.com/hmcts>"

RUN mkdir -p /usr/src/app
RUN chmod 777 /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 8080
CMD [ "yarn", "start" ]
