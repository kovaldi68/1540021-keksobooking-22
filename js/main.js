const getRandomNumberInRange = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Введите корректные значения');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log('getRandomNumberInRange', getRandomNumberInRange(6, 10));

const getRandomFloatInRange = (min, max, commaCount) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Введите корректные значения');
  }

  return Number((Math.random() * (max - min) + min).toFixed(commaCount));
}

console.log('getRandomFloatInRange', getRandomFloatInRange(11, 19, 8));
