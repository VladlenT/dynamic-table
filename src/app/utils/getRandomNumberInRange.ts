export const getRandomNumberInRange = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));
