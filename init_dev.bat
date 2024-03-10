@echo off
REM Start the backend service in a new Command Prompt window
start cmd.exe /k "cd backend && mvn quarkus:dev"

REM Start the web app in another new Command Prompt window
start cmd.exe /k "cd web-app && yarn dev"