const typeSelector = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInSelector = document.querySelector('#timein');
const timeOutSelector = document.querySelector('#timeout');

const priceMap = {
  flat: 1000,
  house: 5000,
  bungalow: 0,
  palace: 10000,
};

const priceChangeHandler = () => {
  priceInput.min = priceMap[typeSelector.value];
  priceInput.placeholder = priceMap[typeSelector.value];
};

priceChangeHandler();

const checkInChangeHandler = () => {
  timeOutSelector.value = timeInSelector.value;
};

const checkOutChangeHandler = () => {
  timeInSelector.value = timeOutSelector.value;
};

typeSelector.addEventListener('change', priceChangeHandler);

timeInSelector.addEventListener('change', checkInChangeHandler);

timeOutSelector.addEventListener('change', checkOutChangeHandler);
