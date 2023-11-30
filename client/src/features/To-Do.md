Essential features;

- Any UI allowing a user to interact with the game:

  - Ability to guess 4 number combinations (fetch from Random api)
  - Ability to view the history of guesses and their feedback (keep feedback to text display first)
    - Clarify: History of guesses for only the current game?
  - Display number of guesses remaining

- Must use Random gemerator API
  - GET request with URL params

Frontend now has functionality to:

- Save a player's name in state (no auth yet, app operates as a SPA with player name saved at the app level component)
- Save a selected difficulty level
- Start a game
  - Calls backend API, which itself makes an API call to random.org to generate an array of random numbers
  - Player can start a new game (will only stick to difficulty level selected at home page)
  - Stores player's progress in state
  - WIP: Build functionality to check against winning conditions
  - WIP: Build functionality to provide feedback re:"clues" after each submission

To-Do:

- Frontend

  - Build functionality to render clues and save to state
    - Should save state of previously submitted clues and render them with corresponding saved user guesses
  - Check winning condition after each submission
  - Display remaining number of guesses
  - Display user games data/statistics (stretch)
  - Conditionally render hints (stretch)

- Backend

  - Initialize and connect to db (confirm LinkedIn's db, consider SQL)
    - Basic auth (stretch)
    - Games won or lost are saved in the user object (stretch)
      - Decide on a data structure to save completed games
      - Routes to return user games data/statistics
  - Db models
    - Users model
      - User auth data
        - Username: str
        - Password: str
      - User games
        - {
            wins: [{}, {}, {}],
            losses: []
          }
    - Games model
      - High scores
  - SQL
    - Game table
      - Game id
      - Rounds columns
        - Array of user guesses
      - 

Stretch:

- Build a timer
  - Wrap into its own hook
  - Depending on difficulty, have backend respond with both number array and countdown for the timer
- Send hints to the frontend
- Build out the scoreboard
  - Keep a running top ten scores list
  - Separate scoreboards per difficulty
  - Decide on criteria to judge top scores
    - Quickest game
    - Fewest guesses
- 2 player mode with websockets
- Acorns

Mental hurdles:

- Keep as much logic backend as possible
- Still maintain practical and smooth UX
  - Limit network calls
- Logical and practical flow of data
- Single responsibility principle with handling of game logic
