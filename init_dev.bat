@echo off
wt -p "Command Prompt" -d .\backend\ cmd /k "mvn quarkus:dev" ; split-pane -V -p "Command Prompt" -d .\web-app\ cmd /k "yarn dev"