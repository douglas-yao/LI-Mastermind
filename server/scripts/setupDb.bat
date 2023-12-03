@echo off

REM Prompt the user for the MySQL username
set /p MYSQL_USER=Enter your MySQL username:

REM Prompt the user for the MySQL password
set /p MYSQL_PASSWORD=Enter your MySQL password:

REM Set the path to the SQL script
set SQL_SCRIPT_PATH=%~dp0\setupDb.sql

REM Run the setup SQL script
if %ERRORLEVEL% equ 0 (
  echo Database setup successful!
) else (
  echo Database setup failed. Please check your MySQL credentials and try again.
)
