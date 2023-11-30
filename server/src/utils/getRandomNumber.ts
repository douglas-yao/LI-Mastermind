import axios from 'axios';
import convertStringToArray from './convertIndexToString';

export default async function getRandomNumber(difficultyLevel: string) {
  console.log(`Playing on difficulty ${difficultyLevel}`);

  // To-do: incorporate logic to handle settings for Easy, Normal, and Hard modes
  const response = await axios.get(
    'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
  );
  const randomNumbers = convertStringToArray(response.data);
  return randomNumbers;
}
