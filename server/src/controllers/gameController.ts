import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import gameModel from '../models/GameModel';
import userGameModel from '../models/userGameModel';
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
      guessHistory: [],
      feedbackHistory: [],
      userId: userId,
      difficulty: difficulty,
      isGameOver: false,
    });

    // Save the solution and remaining guesses to the database
    await gameModel.createNewGameInstance(
      solution,
      currentGameCache.guessesRemaining,
      currentGameCache.gameId
    );

    await userGameModel.createNewUserGame(
      userId,
      currentGameCache.gameId,
      difficulty
    );

    // Return random solution and remaining guesses to the client
    // res.locals.newGameData = {
    //   solution,
    //   startingNumberGuesses: currentGameCache.guessesRemaining,
    // };
    res.locals.newGameData = currentGameCache;
    return next();
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handles the submission of a new attempt
type FeedbackResponse = {
  response: string;
  won: boolean;
};
type UpdateGameControllerResponse = {
  feedback: FeedbackResponse[];
  updatedGuessesRemaining: number;
  error?: string;
};
const updateGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { currentGuess } = req.body;

  try {
    const feedback = generateFeedback(
      currentGuess,
      currentGameCache.currentSolution
    );

    // Wrap into a db transaction handler that takes in guessesRemaining and feedback.won
    // Handle logic to send losing condition message to client
    currentGameCache.guessHistory.push(currentGuess);
    currentGameCache.feedbackHistory.push(feedback);
    console.log('updated guess history: ', currentGameCache.guessHistory);
    if (--currentGameCache.guessesRemaining === 0 || feedback.won === true) {
      userGameModel.updateGameCompletionStatus(
        currentGameCache.gameId,
        feedback.won,
        currentGameCache.difficulty
      );
      currentGameCache.setProperties({ isGameOver: true });
      feedback.won
        ? console.log('***** User won the game *****')
        : console.log('***** User lost the game *****');
    } else {
      gameModel.updateGameInstance(
        currentGameCache.gameId,
        currentGuess,
        currentGameCache.currentSolution,
        feedback.response,
        currentGameCache.guessesRemaining
      );
    }

    // If keeping debugging logs below, consider wrapping
    console.log('incoming submission: ', req.body);
    console.log('feedback: ', feedback);

    res.locals.evaluatedSubmission = <UpdateGameControllerResponse>{
      feedback: currentGameCache.feedbackHistory,
      updatedGuessesRemaining: currentGameCache.guessesRemaining,
      isGameOver: currentGameCache.isGameOver,
      updatedGuessHistory: currentGameCache.guessHistory,
    };
    return next();
  } catch (error) {
    console.error('Error submitting current attempt:', error);
    res.status(500).send('Internal Server Error');
  }
};

export { startGameController, updateGameController };

// cache: [{gameId: 1, solution: '1234'}, {gameId: 2, solution: '5678'}]
