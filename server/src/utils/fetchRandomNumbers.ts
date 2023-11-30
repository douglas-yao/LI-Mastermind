import axios from 'axios';

export default async function getRandomNumber(difficultyLevel?: string) {
  console.log(`Playing on difficulty ${difficultyLevel}`);

  const response = await axios.get(
    'https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new'
  );
  console.log('response from Random API: ', response);
  return response.data;
}
