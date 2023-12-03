-- Create the database
CREATE DATABASE IF NOT EXISTS mastermind_game;

-- Use the database
USE mastermind_game;

-- Create the games table
CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gameId VARCHAR(45) NOT NULL,
  attempt VARCHAR(45) DEFAULT NULL,
  solution VARCHAR(45) DEFAULT NULL,
  feedback VARCHAR(45) DEFAULT NULL,
  guessesRemaining INT DEFAULT 0,
  difficulty VARCHAR(45) DEFAULT NULL
);

-- Create the user_games table
CREATE TABLE IF NOT EXISTS user_games (
  gameId VARCHAR(45) PRIMARY KEY NOT NULL,
  userId VARCHAR(45) DEFAULT NULL,
  won BOOLEAN DEFAULT false,
  completed BOOLEAN NOT NULL DEFAULT false,
  difficulty VARCHAR(45) NOT NULL,
  time VARCHAR(45) DEFAULT NULL
);
