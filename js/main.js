let getRandomNumber = (min, max) => {
  if (min >= 0 && max >= 0) {
    if (max > min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      console.log('Верхний порог должен быть больше, чем нижний');
    }
  } else {
    console.log('Значение может быть только больше 0 или равно ему');
  }
}

console.log(getRandomNumber(6, 10));

function getRandomFloat (min, max, commaCount) {
  if (min >= 0 && max >= 0) {
    if (max > min) {
      return +(Math.random() * (max - min) + min).toFixed(commaCount);
    } else {
      console.log('Верхний порог должен быть больше, чем нижний');
    }
  } else {
    console.log('Значение может быть только больше 0 или равно ему');
  }
}

console.log(getRandomFloat(11, 19, 8));
