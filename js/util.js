const getRandomNumberInRange = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Введите корректные значения');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloatInRange = (min, max, commaCount) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Введите корректные значения');
  }

  return Number((Math.random() * (max - min) + min).toFixed(commaCount));
}

const getRandomArray = (array) => {
  const newArray = [];

  array.forEach((element) => {
    if (Math.random() > 0.5) {
      return;
    }
    newArray.push(element);
  })

  return newArray;
}

const getRandomArrayElement = (dataArray) => {
  const randomizer = Math.floor(Math.random() * dataArray.length);

  return dataArray[randomizer];
}

export {
  getRandomNumberInRange,
  getRandomFloatInRange,
  getRandomArray,
  getRandomArrayElement
};
