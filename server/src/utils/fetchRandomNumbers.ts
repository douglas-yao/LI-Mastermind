import axios from 'axios';

export default async function fetchRandomNumbers(difficultyLevel?: string) {
  const response = await axios.get(
    'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
  );
  return response.data;
}
