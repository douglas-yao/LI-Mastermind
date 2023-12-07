# LI-Mastermind

Welcome to LI-Mastermind, a numbers guessing Mastermind game!

## About

This is a fullstack application that allows a user to play a challenging numbers guessing game.

Different difficulty settings can be selected, and the user can view the fastest games won on a scoreboard (requires database access).

**Primary Features:**

- Choose a game difficulty (Easy, Normal, Hard).
- Guess a combination of randomly generated numbers (3 numbers for easy, 4 for normal, and 5 for hard).
- Games are timed! There is no time limit, but only the quickest games make it onto the scoreboard.
- Dynamically generated feedback will help guide you to the correct answer.
- Check the scoreboard, and see if you solved the puzzle fast enough to make it to the top ten!
  - Don't forget to enter your player name if you want the world to know that you're a Mastermind. Otherwise, you can remain anonymous.

## Setting Up Your Environment

_Before you begin, make sure you have Node.js installed on your machine. If not, you can download and install it here: https://nodejs.org/en_

**To get started, follow these steps to set up your dev environment:**

1. **Clone the Repository:**

   - Clone this repository to your local machine.

     ```bash
     git clone https://github.com/your-username/LI-Mastermind.git
     ```

2. **Install Dependencies:**

   - Navigate to the root directory of the project.

     ```bash
     cd LI-Mastermind
     ```

   - **Client:**

     ```bash
     cd client
     npm install
     ```

   - **Server:**
     ```bash
     cd ../server
     npm install
     ```

   ### **_To skip use of a database, checkout to branch `cacheOnly` and *skip steps 3 and 4!*_**

   Run in your terminal:

   ```bash
   git pull --all
   checkout cacheOnly
   ```

**_Must have MySQL (https://dev.mysql.com/downloads/mysql/8.0.html) installed and running (also helps to have MySQL Workbench)!_**

3. **Create a `.env` file:**

   - Create a `.env` file in the root directory of the `server` folder.

   - Open the `.env` file in a text editor.

   - Add the following lines, replacing `<your-db-user>`, `<your-db-password>`, and, optionally, `<your-port-number>` with your actual MySQL database username, password, and port number:

     - **Port number defaults to 3306 if not supplied**

     ```env
     DB_USER=<your-db-user>
     DB_PASSWORD=<your-db-password>
     DB_PORT=<your-port-number> #OPTIONAL, DEFAULTS TO 3306
     ```

4. **Run Database Setup:**

- Navigate to the `server` directory and initialize the database.

- **For Unix-like systems (Linux or macOS):**

  ```bash
  sh scripts/serverDbInit.sh
  ```

  **If you encounter a permission error, run the following command:**

  ```bash
  chmod +x scripts/serverDbInit.sh
  ```

  Follow the prompts to enter your MySQL username and password. Ensure you have MySQL installed and running on your local machine. The script will create the necessary database and tables.

- **For Windows:**

  ```batch
  serverDbInit.bat
  ```

  **If you encounter a permission error, you might need to run the script with administrative privileges.** Right-click on `serverDbInit.bat` and choose "Run as administrator." Follow the prompts to enter your MySQL username and password. The script will create the necessary database and tables.

### Run Client and Server:

- For all systems, make sure you're in the root `LI-Mastermind` directory, and run:

  ```bash
  npm run dev
  ```

  The script will run the necessary commands to start both the client and server.

- Another option is to run the client and server separately by running `npm run dev` in both the client and server directories.

### Testing:

- Currently, only the backend is tested.
  - All server testing code lives in the `./server/src/__tests__` directory.
- Run server tests with:

  ```bash
  cd server
  npm run test
  ```

### Interacting with the Game

- Open your web browser and go to [localhost:3001](http://localhost:3000) to start playing the game.

  - **Note: The localhost address may vary if port 3001 is already in use. Please keep an eye on the terminal output for the final port used by the client.**

- **Playing the game:**
  - **On the home screen:**
    - Select which difficulty you would like to use. The difficulty selections of 'Easy', 'Normal', and 'Hard' set the length of the random solution to 3, 4, or 5 respectively.
    - **If no games have been completed, or if on the `cacheOnly` branch, the scoreboard should only render 'No scores to display'.**
      - Otherwise, a table will display player names, the time taken to finish the game, and the total number of guesses taken. Use the arrows to navigate between difficulty scoreboards.
    - Click the 'Play' button to go to the game component.
  - **In the game component:**
    - Enter a player name, or leave it blank (it will default to 'Anonymous')
    - You can view the current game's parameters under the 'Player' and 'Current difficulty' displays.
    - Click the 'New Game' button to start the game:
      - The game timer will start.
      - You'll see a new input field rendered to the screen, under the game timer. Please enter your guess here, then click the 'Submit' button or press 'Enter'.
        - If the guess is invalid, you should be prompted with a message reminding you of the game parameters.
        - If the guess is valid for the current game parameters:
          - The submitted guess and its corresponding feedback should render to the screen.
          - The 'Guesses Remaining' should decrement by one.
        - If the correct answer is submitted:
          - The submission should render to the screen normally, with the feedback: 'You are a Mastermind!'
          - Confetti!
        - If out of guesses:
          - The correct answer should render to the screen, along with an encouraging message.
    - **The timer should disappear when the game is over.**
    - **Click the 'New Game' button at any time to instantly start another game, under the same difficulty.**
    - **Click the 'Home' button to return to home component, where you can re-select difficulty and view the scoreboard.**

## Technologies, Code Structure, and Thought Process

LI-Mastermind is built in **TypeScript**.

- The frontend is built in **React** and styled with **TailwindCSS**.

- The backend runs in a **Node** environment and built in **Express**, following MVC architecture.
  - Tested with **Jest** and **Supertest**.

The codebase is separated into two main directories: `client` and `server`. This allows for their individual containerization and deployment (refer to the 'Looking Ahead' section below).

- **Client**

  In this game, the client is presentational. The only game/business logic it handles is sending data to the server and rendering the response. Components and their data sent / received are:

  - **GameBoard component:**

    - **A request for data required to start a new game**, requested by clicking the 'New Game' button.

      _Data sent to the server:_

      - Current player's name (optional)
      - Difficulty setting (Easy, Normal, Hard)

      _Data received from the server and rendered to the user:_

      - Game start logic, including a randomized solution (length based on requested difficulty) and how many guesses the user can make.
      - Any applicable error messages, such as invalid username.

    - **A request for data required to continue playing the game**, requested by clicking the 'Submit' button (or pressing 'Enter' on the guess input field).

      _Data sent to the server:_

      - User-provided guess.

      _Data received from the server and rendered to the user:_

      - isGameOver object that tells the client if a winning or losing condition has been met, along with a corresponding message to render to the user.
      - History of current game's guesses.
      - Feedback generated for the user's guess(es). All feedback generated in a game instance is contained in this feedback array.
      - **The client handles pairing up the history of guesses with their corresponding feedback to render to the user.**
      - Number of available guesses.
      - Error message if applicable. User should be alerted with a specific message from the server, such as a message detailing incorrect input types.

  - **Scoreboard component:**

    - A request for top ten scores by difficulty.

      _Data sent to the server:_

      - Difficulty setting (Easy, Normal, Hard)

      _Data received from the server and rendered to the user:_

      - Top ten fastest games won. Player name, guesses taken to win, and total game time are displayed in a table.
      - If fetching fails or using the `cacheOnly` branch, a 'No scores' message renders.

- **Server:**

  The server handles all game logic, including:

  - Dynamically fetching a random sequence from the random.org API, based on user-selected difficulty level.
    - Parsing the response into a format digestible by this application.
  - Initializing a game with necessary data from config files.
    - Handles dynamic generation of game data depending on user-selected difficulty level.
  - Algorithmically comparing a user-provided guess against the generated solution.
  - Dynamically generating feedback to send back to the user.
  - Judging winning or losing conditions and sending the client corresponding data.
  - Starting and ending a game timer, along with recording the total elapsed game time.
  - Querying the database and sending the client a parsable top ten scores list, based on user-selected difficulty level.

  All models, schemas, routes, controllers, middleware, services, configs, api, and testing directories are contained within the `src` directory.

  - Routes
    - `gameRoutes.ts`
      - Handles all game-related requests.
      - `/start`
        - Handles logic to start a game.
      - `/play`
        - Handles logic to play the game.
        - Also checks for and handles a winning or losing condition.
    - `scoresRoutes.ts`
      - Handles all scoreboard-related requests.
      - `/scores`
        - Handles querying the database for completed game data
  - Controllers
    - `gameController.ts`
      - Handles `/start` route and `/play` route logic.
    - `scorescontroller.ts`
      - Handles `/scores` route logic.
  - Middleware
    - `validateCurrentGuess.ts` and `validateStartGame.ts` handle validating and sanitizing client request.
      - Invalid requests shortcircuit the request cycle and return errors to the client.
    - `logger.ts` logs game progress to the server, just like the client logs feedback and game history to the user.
  - Services
    - `gameCacheService`
      - Acts as a cache for each game instance.
      - Has methods to initiate the cache, set cache properties, and reset the cache.
    - `gameDbService.ts`
      - Has methods to group database reading and writing for the controllers to call.
    - `gameLoggingService.ts`
      - Wraps logic to dynamically log game progress to the server console.
      - This service's purpose is to plug into any modules that may handle CLI-based game play.
    - `gameManagementService.ts`
      - Wraps all logic to start or play a game, including generating a parsable random solution and initializing the game with appropriate data (including difficulty parameters).
      - **Contains the algorithmic logic to handle comparison of the user's guess vs the randomized solution (the `compareStrings` method).**
    - `timerService.ts`
      - Wraps logic to handle starting and stopping a timer feature.
  - Models
    - `GameModel.ts`
      - Handles interactions with a database that stores in-game details.
      - This model is not currently game-critical, as all current game instance data is stored in the caching service, but is created to later implement a game analytics feature.
    - `UserGameModel.ts`
      - Handles interactions with a database that stores win-or-lose game information, such as user id, game id (foreign key for the GameModel), whether the game was won, the guesses taken to win, and the time taken to win.
  - API
    - Contains any files that handle API requests, in this case the random.org API.

- Testing:
  - Testing can be found in the `__testing__` directory in `src`.
  - The business critical algorithmic logic of comparing the user's guess against a previously generated solution is thoroughly tested here.
  - Routes are tested with Jest and Supertest to simulate a request's full cycle from client to server and back to client.

**Thought Process:**

The goal of this project is to create an application that has all game and business critical logic handled on the backend.

The client provides a way for the user to input a username, a difficulty setting, and a guess attempt. It then only renders information provided by the server. There is validation and error handling on the backend to prevent injection attacks or any invalid inputs from entering controller logic. The client is designed to be intuitive, with styled interactive buttons and input fields that clearly delineate their purpose to the user.

Everything else is handled on the server.

All game logic are wrapped into services in the server (`./src/services` directory), including fetching and parsing of the random numbers, comparing this fetched sequence to the user's guess algorithmically (`compareStrings` method in `./services/gameManagementService.ts`), dynamically generating a response to send the user (`getFeedback` method in `./services/gameManagementService.ts`), and recognizing a game-winning or game-losing condition. Extension features are also handled the server, including the starting/ending/recording of game time, .

The server is built to clearly outline each request lifecycle. Both MVC architecture and SOLID principles guided decision-making and design choices. Each route, controller, and middleware have singular duties. Each service helps wrap similar logic for controller and middleware legibility and debugging. All moving parts are wrapped in try/catch blocks for detailed error handling, and critical pieces of logic are tested so that developers can add features with confidence. Certain pieces of infrastructure, such as the `GameModel`, are set up to provide for a wide potential of new features, such as game analytics and viewing a previously played game.

## Looking Ahead

**Features To Implement:**

- Hints for the user to toggle, such as highlighting a number that's in the correct position.
- Game analytics, such as average guesses or time taken to win.
- User authorization and authentication, so that a user can log in and view their played games.
  - View user analytics and trends.
- Enable the user to toggle hiding the game timer. This can feel anxiety inducing for some!
- Text-to-speech accessibility
- Training mode, where a strategy is suggested and a variety of feedback are provided.
- More difficulty modes, such as a Mastermind mode where no guess history is shown, only the current guess feedback.
- Multiplayer mode.

**Server Improvements**

- Improved caching to limit database read/write transactions.
- Incorporate websocket technology for multi-player mode.

## Contributing

If you'd like to contribute to this project, feel free to submit issues or pull requests. Your contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

Shoutout to LinkedIn and the REACH Apprenticeship for the amazing and fun opportunity to create this game!

Happy Gaming!
