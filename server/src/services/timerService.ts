/**
 * Service to manage the game timer.
 */
class TimerService {
  private gameStartTime: number;

  /**
   * Initializes the timer service with a default game start time of 0.
   */
  constructor() {
    this.gameStartTime = 0;
  }

  /**
   * Starts the timer when a new game begins.
   */
  startGameTimer(): void {
    this.gameStartTime = Date.now();
  }

  /**
   * Calculates and returns the elapsed time in seconds.
   *
   * @throws Will throw an error if the game timer has not been started.
   * @returns The elapsed time in seconds.
   */
  getElapsedGameTime(): number {
    if (this.gameStartTime === 0) {
      throw new Error('Game timer not started');
    }

    const currentTime: number = Date.now();
    const elapsedMilliseconds: number = currentTime - this.gameStartTime;
    const elapsedSeconds: number = Math.floor(elapsedMilliseconds / 1000);

    return elapsedSeconds;
  }
}

// Create a single instance of the TimerService
const timerService: TimerService = new TimerService();

export default timerService;
