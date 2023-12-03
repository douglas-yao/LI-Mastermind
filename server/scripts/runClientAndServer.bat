@echo off

REM Navigate to the client directory
cd client

REM Run the client
npm run dev

REM Navigate to the server directory
cd ../server

REM Run the server
npm run dev
