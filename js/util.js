const ALERT_SHOW_TIME = 3000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.color = 'white';
  alertContainer.style.padding = '16px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' ||  'Esc');
};

const debounce = (debouncedFunc, delay) => {
  let timeout;
  return function () {
    const funcCall = () => {debouncedFunc.apply(this, arguments)}
    clearTimeout(timeout);
    timeout = setTimeout(funcCall, delay)
  };
};

export {
  getRandomNumberInRange,
  getRandomFloatInRange,
  getRandomArray,
  getRandomArrayElement,
  getWordEnding,
  showAlert,
  isEscEvent,
  debounce
};
