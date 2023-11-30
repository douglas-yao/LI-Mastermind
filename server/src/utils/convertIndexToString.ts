export default function convertStringToArray(str: string) {
  const stringArray = str.trim().split('\n');

  const numberArray = stringArray.map(Number);

  return numberArray;
}
