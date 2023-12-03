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

3. **Run Client:**

   - Change into the `client` directory.

     ```bash
     cd client
     ```

   - Execute the following command to start the client development server.

     ```bash
     npm run dev
     ```

4. **Run Server:**

   - Change into the `server` directory.

     ```bash
     cd server
     ```

   - Run the following command to start the server.

     ```bash
     npm run dev
     ```

5. **Database Setup:**

   - Before running the application, you need to set up the database.

   - Open a terminal and navigate to the root directory of the project.

   - Run the following command to make the setup script executable:

     ```bash
     chmod +x scripts/setupDb.sh
     ```

     This command grants the necessary permissions to the setup script.

   - Run the setup script to create the database and tables:

     ```bash
     ./scripts/setupDb.sh
     ```

     The script will prompt you for your MySQL password. Enter the password when prompted.

     The database and tables will be created, and you're ready to use the application!

6. **Play the Game:**
   - Open your web browser and go to [localhost:5172](http://localhost:5172) to start playing the game!

## Contributing

If you'd like to contribute to this project, feel free to submit issues or pull requests. Your contributions are always welcome!

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgments

Special thanks to LinkedIn and the REACH Apprenticeship for the fun opportunity to create this game!

Happy Gaming!
