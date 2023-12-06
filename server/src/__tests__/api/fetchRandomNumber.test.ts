import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import fetchRandomNumbers from '../../api/fetchRandomNumbers';

// Mock axios
jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('fetchRandomNumbers', () => {
  it('fetches random numbers successfully on normal difficulty', async () => {
    // Create mocked response for normal difficulty:
    const mockedResponse = '1\n2\n3\n4\n';
    axiosMock.get.mockResolvedValue({ data: mockedResponse });

    // Call fetchRandomNumbers with 'Normal' difficulty
    const difficultyLevel = 'Normal';
    const result = await fetchRandomNumbers(difficultyLevel);

    // Construct url with num=4 for 'Normal' difficulty
    const expectedUrl = expect.stringContaining(
      'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
    );

    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedResponse);
  });

  it('fetches random numbers successfully on easy difficulty', async () => {
    // Create mock response for easy difficulty
    const mockedResponse = '1\n2\n3\n';
    axiosMock.get.mockResolvedValue({ data: mockedResponse });

    // Call fetchRandomNumbers with 'Easy' difficulty
    const difficultyLevel = 'Easy';
    const result = await fetchRandomNumbers(difficultyLevel);

    // Construct URL with num=3 for 'Easy' difficulty
    const expectedUrl = expect.stringContaining(
      'https://www.random.org/integers/?num=3&min=0&max=7&col=1&base=10&format=plain&rnd=new'
    );

    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedResponse);
  });

  it('fetches random numbers successfully on hard difficulty', async () => {
    // Create mock response for hard difficulty
    const mockedResponse = '1\n2\n3\n4\n5\n';
    axiosMock.get.mockResolvedValue({ data: mockedResponse });

    // Call fetchRandomNumbers with 'Hard' difficulty
    const difficultyLevel = 'Hard';
    const result = await fetchRandomNumbers(difficultyLevel);

    // Construct URL with num=5 for 'Hard' difficulty
    const expectedUrl = expect.stringContaining(
      'https://www.random.org/integers/?num=5&min=0&max=7&col=1&base=10&format=plain&rnd=new'
    );

    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(mockedResponse);
  });

  it('throws an error when fetching random numbers fails', async () => {
    // Mock the error message
    const mockedError = new Error('Failed to fetch random numbers');
    axiosMock.get.mockRejectedValue(mockedError);

    // Call fetchRandomNumbers
    const difficultyLevel = 'Easy';
    await expect(fetchRandomNumbers(difficultyLevel)).rejects.toThrowError(
      'Failed to fetch random numbers'
    );

    const expectedUrl = expect.stringContaining(
      'https://www.random.org/integers/?num=3&min=0&max=7&col=1&base=10&format=plain&rnd=new'
    );
    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
  });
});
