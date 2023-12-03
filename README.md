# LI-Mastermind

Welcome to LI-Mastermind, a numbers guessing Mastermind game!

## Instructions

To get started, follow these steps:

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

6. **Play the Game:**
   - Open your web browser and go to [localhost:3000](http://localhost:3000) to start playing the game.
   - Note: The localhost address may vary if port 3000 is already in use. Please keep an eye on the terminal output for the final port used by the client.

## Contributing

If you'd like to contribute to this project, feel free to submit issues or pull requests. Your contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

Shoutout to LinkedIn and the REACH Apprenticeship for the fun opportunity to create this game!

Happy Gaming!
