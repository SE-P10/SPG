FROM node

WORKDIR /app

RUN npm ci --silent

COPY ./client .
COPY ./server .

# WORKDIR /app/client
# RUN npm install --silent

WORKDIR /app/server
RUN npm install --silent

# WORKDIR /app/client
# RUN npm start &

WORKDIR /app/server
RUN node ./server.js &
