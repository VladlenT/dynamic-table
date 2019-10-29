export const getRandomNumberInRange = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));
