@echo off

REM Prompt the user for the MySQL username
set /p MYSQL_USER=Enter your MySQL username:

REM Prompt the user for the MySQL password
set /p MYSQL_PASSWORD=Enter your MySQL password:

REM Set the absolute path to the SQL script
set SQL_SCRIPT_PATH=%cd%\..\src\schemas\mastermindSchema.sql

REM Run the setup SQL script
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% < %SQL_SCRIPT_PATH%

REM Check the error level and display a message accordingly
if %ERRORLEVEL% equ 0 (
  echo Database setup successful!
) else (
  echo Database setup failed. Please check your MySQL credentials and try again.
)
