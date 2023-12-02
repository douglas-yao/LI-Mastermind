import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import gameOperations from '../models/games_normalModel';
import userGameOperations from '../models/user_gamesModel';
import CurrentGameCache from '../cache/gameCache';
import { getRandomSolution, generateFeedback } from '../services/index';

// CurrentGameCache to store current game instance's data
const currentGameCache = new CurrentGameCache();

// Handles the initiation of a new game
/**
 * Input: Request body containing the userId:string and difficulty:string
 * Output: Response to the route handler containing a randomized solution:string and number of guesses:number
 */
const startGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('incoming new game request: ', req.body);
  const { userId, difficulty } = req.body;
  try {
    // Fetch a random number sequence from the Random.org API
    const solution = await getRandomSolution(difficulty);

    // Instantiate game cache with starting data
    currentGameCache.setProperties({
      gameId: uuidv4(),
      guessesRemaining: 10,
      currentSolution: solution,
      userId: userId,
      difficulty: difficulty,
    });

    // Save the solution and remaining guesses to the database
    await gameOperations.createNewGameInstance(
      solution,
      currentGameCache.guessesRemaining,
      currentGameCache.gameId
    );

    await userGameOperations.createNewUserGame(
      userId,
      currentGameCache.gameId,
      difficulty
    );

    // Return random solution and remaining guesses to the client
    res.locals.newGameData = {
      solution,
      startingNumberGuesses: currentGameCache.guessesRemaining,
    };
    return next();
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handles the submission of a new attempt
const updateGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validation: Consider wrapping into its own module
    if (currentGameCache.gameId === null) {
      console.error('Server error occurred: no game id saved in cache');
      return;
    }

    // To-do: validation check if submittedGuess is an appropriate submission

    const { submittedGuess } = req.body;

    // Modularize feedback logic into its own handler function

    const { comparisons, feedback } = generateFeedback(
      submittedGuess,
      currentGameCache.currentSolution
    );

    if (--currentGameCache.guessesRemaining === 0 || feedback.won === true) {
      console.log('***** Game result ***** ', feedback.won);
      userGameOperations.updateGameCompletionStatus(
        currentGameCache.gameId,
        feedback.won,
        currentGameCache.difficulty
      );
    } else {
      gameOperations.updateGameInstance(
        currentGameCache.gameId,
        submittedGuess,
        currentGameCache.currentSolution,
        feedback.response,
        currentGameCache.guessesRemaining
      );
    }

    console.log('incoming submission: ', req.body);
    console.log('comparisons: ', comparisons);
    console.log('feedback: ', feedback);
    res.locals.evaluatedSubmission = {
      comparisons,
      feedback,
      updatedGuessesRemaining: currentGameCache.guessesRemaining,
    };
    return next();
  } catch (error) {
    console.error('Error submitting current attempt:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGameController, updateGameController };

// cache: [{gameId: 1, solution: '1234'}, {gameId: 2, solution: '5678'}]
