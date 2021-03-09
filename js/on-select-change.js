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

const onSelectChange = () => {
  priceInput.min = priceMap[typeSelector.value];
  priceInput.placeholder = priceMap[typeSelector.value];
};

const timeInChange = () => {
  timeOutSelector.value = timeInSelector.value;
};

const timeOutChange = () => {
  timeInSelector.value = timeOutSelector.value;
};

typeSelector.addEventListener('change', onSelectChange);

timeInSelector.addEventListener('change', timeInChange);

timeOutSelector.addEventListener('change', timeOutChange);
