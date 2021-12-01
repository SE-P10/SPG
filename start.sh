#!/bin/sh
echo "Starting Server"
cd /app/server
node server.js &

echo "Strarting Client"
cd /app/client
npm start

