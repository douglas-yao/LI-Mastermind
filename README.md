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

   - Run the following command to install dependencies.

     ```bash
     npm install
     ```

3. **Run Database Setup:**

   - For Unix-like systems (Linux or macOS):

     ```bash
     cd server
     sh scripts/setupDb.sh
     ```

   - For Windows:

     ```batch
     cd server
     setupDb.bat
     ```

   Follow the prompts to enter your MySQL username and password. The script will create the necessary database and tables.

4. **Run Client:**

   - Change into the `client` directory.

     ```bash
     cd client
     ```

   - Execute the following command to start the client development server.

     ```bash
     npm run dev
     ```

5. **Run Server:**

   - Change into the `server` directory.

     ```bash
     cd server
     ```

   - Run the following command to start the server.

     ```bash
     npm run dev
     ```

6. **Play the Game:**
   - Open your web browser and go to [localhost:5172](http://localhost:5172) to start playing the game!

## Contributing

If you'd like to contribute to this project, feel free to submit issues or pull requests. Your contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

Shoutout to LinkedIn and the REACH Apprenticeship for the fun opportunity to create this game!

Happy Gaming!
