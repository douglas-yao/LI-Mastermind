#!/bin/bash

# Prompt the user for the MySQL username
read -p "Enter your MySQL username: " MYSQL_USER

# Prompt the user for the MySQL password
read -sp "Enter your MySQL password: " MYSQL_PASSWORD

# Set the absolute path to the SQL script
SQL_SCRIPT_PATH="$(pwd)/src/schemas/mastermindSchema.sql"

# Run the setup SQL script
if mysql -u $MYSQL_USER -p$MYSQL_PASSWORD < "$SQL_SCRIPT_PATH"; then
  echo "Database setup successful!"
else
  echo "Database setup failed. Please check your MySQL credentials and try again."
fi
