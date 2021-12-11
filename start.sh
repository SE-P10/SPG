#!/bin/sh
echo "Starting Server"
cd /app/server
node server.js > nul &

echo "Strarting Client"
cd /app/client
npm start > nul
