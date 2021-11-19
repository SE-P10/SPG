#!/bin/bash

apt-get install -y npm

cd /app/server
node server.js &

cd /app/client
npm start &

