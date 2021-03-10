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

const getWordEnding = (number, textForms) => {
  number = Math.abs(number) % 100;
  const leftOver10 = number % 10;
  if (number > 10 && number < 20) {
    return textForms[2]; }
  if (leftOver10 > 1 && leftOver10 < 5) {
    return textForms[1]; }
  if (leftOver10 == 1) {
    return textForms[0]; }
  return textForms[2];
}

export {
  getRandomNumberInRange,
  getRandomFloatInRange,
  getRandomArray,
  getRandomArrayElement,
  getWordEnding,
};
