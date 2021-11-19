#!/bin/bash
echo "Running Client"
cd /app/server
node server.js &

echo "Running Client"
cd /app/client
npm start

