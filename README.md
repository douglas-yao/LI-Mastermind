# LI-Mastermind

Welcome to LI-Mastermind, a numbers guessing Mastermind game!

## Instructions

To get started, follow these steps to set up your dev environment:

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

**To skip use of a database, checkout to branch `cacheOnly` and skip steps 3 and 4**

3. **Create a `.env` file:**

   - Create a `.env` file in the root directory of the `server` folder.

   - Open the `.env` file in a text editor.

   - Add the following lines, replacing `<your-db-user>` and `<your-db-password>` with your actual MySQL database username and password:

     ```env
     DB_USER=<your-db-user>
     DB_PASSWORD=<your-db-password>
     ```

4. **Run Database Setup:**

   - While in the server directory, initialize the database. Ensure you have MySQL installed and running on your local machine:

   - For Unix-like systems (Linux or macOS):

     ```bash
     sh scripts/serverDbInit.sh
     ```

     If you encounter a permission error, run the following command:

     ```bash
     chmod +x scripts/serverDbInit.sh
     ```

     Follow the prompts to enter your MySQL username and password. Ensure you have MySQL installed and running on your local machine. The script will create the necessary database and tables.

   - For Windows:

     ```batch
     serverDbInit.bat
     ```

     If you encounter a permission error, you might need to run the script with administrative privileges. Right-click on `serverDbInit.bat` and choose "Run as administrator." Follow the prompts to enter your MySQL username and password. The script will create the necessary database and tables.

5. **Run Client and Server:**

   - For all systems:

     ```bash
     cd ..
     npm run dev
     ```

     The script will run the necessary commands to start both the client and server.

6. **Interacting with the Game:**

   - Open your web browser and go to [localhost:3000](http://localhost:3000) to start playing the game.

     - Note: The localhost address may vary if port 3000 is already in use. Please keep an eye on the terminal output for the final port used by the client.

   - Playing the game:
     - On the home screen:
       - Select which difficulty you would like to use. The difficulty selections of 'Easy', 'Normal', and 'Hard' set the length of the random solution to 3, 4, or 5 respectively.
       - If no games have been completed, or if playing on the 'cacheOnly' branch, the scoreboard should only render 'No scores to display'.
         - Otherwise, a table will display player names, the time taken to finish the game, and the total number of guesses taken. Use the arrows to navigate between difficulty scoreboards.
       - Click the 'Play' button to go to the game component.
     - In the game component:
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
       - Click the 'New Game' button at any time to instantly start another game, under the same difficulty.
       - Click the 'Home' button to return to home component, where you can re-select difficulty and view the scoreboard.

##

## Contributing

If you'd like to contribute to this project, feel free to submit issues or pull requests. Your contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

Shoutout to LinkedIn and the REACH Apprenticeship for the fun opportunity to create this game!

Happy Gaming!
