-- Create the database
CREATE DATABASE IF NOT EXISTS mastermind_game;

-- Use the database
USE mastermind_game;

-- Create the games table
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  solution VARCHAR(255) NOT NULL,
  guessesRemaining INT NOT NULL,
  gameId VARCHAR(255) NOT NULL,
  difficulty VARCHAR(255) NOT NULL
);

-- Create the user_games table
CREATE TABLE IF NOT EXISTS user_games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  gameId VARCHAR(255) NOT NULL,
  difficulty VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  won BOOLEAN
);
