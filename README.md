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

3. **Run Database Setup:**

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

4. **Run Client and Server:**

   - For all systems:

     ```bash
     cd ..
     npm run dev
     ```

     The script will run the necessary commands to start both the client and server.

5. **Play the Game:**
   - Open your web browser and go to [localhost:5172](http://localhost:5172) to start playing the game!
   - The localhost address may change if that port is already used! Keep an eye on the terminal for the final port used for the client.

## Contributing

If you'd like to contribute to this project, feel free to submit issues or pull requests. Your contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

Shoutout to LinkedIn and the REACH Apprenticeship for the fun opportunity to create this game!

Happy Gaming!
