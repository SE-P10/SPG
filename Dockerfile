# FROM node:lts
FROM ubuntu

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nodejs
RUN apt-get install -y npm

WORKDIR /app/server
COPY ./server .

WORKDIR /app/client
COPY ./client .

WORKDIR /app
COPY ./start.sh .

WORKDIR /app/server
RUN npm ci --silent

WORKDIR /app/client
RUN npm ci --silent

EXPOSE 3000 3001

WORKDIR /app
CMD ["./start.sh"]
