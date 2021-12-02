# FROM node:lts
FROM alpine as base

RUN apk update && apk upgrade
RUN apk add nodejs
RUN apk add npm
RUN apk add bash

WORKDIR /app/server
COPY ./server .

WORKDIR /app/client
COPY ./client .

WORKDIR /app
COPY ./start.sh .


#FROM base as production
#ENV NODE_ENV=production 
WORKDIR /app/server
RUN npm ci --silent --production
WORKDIR /app/client
RUN npm ci --silent --production

#FROM base as dev
#ENV NODE_ENV=development
#WORKDIR /app/server
#RUN npm install -g nodemon --silent && npm ci --silent
#WORKDIR /app/client
#RUN npm ci --silent

EXPOSE 3000 3001

WORKDIR /app
CMD ["sh", "start.sh"]
