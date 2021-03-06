import {getWordEnding} from './util.js';
import {
  setDefaultAddress,
  resetMainMarker,
  mapReset} from './map.js';
import {sendData} from './api.js';
import {successMessage, errorMessage} from './message.js';
import {resetPhotos} from './upload-image.js';

const typeSelector = document.querySelector('#type');
const timeInSelector = document.querySelector('#timein');
const timeOutSelector = document.querySelector('#timeout');
const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adRoomSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const invalidFormElements = adForm.querySelectorAll('input');
const resetButton = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');

const SYMBOL_WORDS = ['символ', 'символа', 'символов'];
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const PALACE_ROOM_COUNT = 100;
const PALACE_GUEST_COUNT = 0;
const STYLES = {
  INVALID: '3px solid red',
  VALID: '1px solid green',
};

const priceMap = {
  flat: 1000,
  house: 5000,
  bungalow: 0,
  palace: 10000,
};

const priceChangeHandler = () => {
  adPriceInput.min = priceMap[typeSelector.value];
  adPriceInput.placeholder = priceMap[typeSelector.value];
};

const checkInChangeHandler = () => timeOutSelector.value = timeInSelector.value;
const checkOutChangeHandler = () => timeInSelector.value = timeOutSelector.value;

const titleInputHandler = (evt) => {
  const length = evt.target.value.length;
  if (length < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Введите ещё ${MIN_TITLE_LENGTH - length} ${getWordEnding(MIN_TITLE_LENGTH - length, SYMBOL_WORDS)}`);
  } else if (length > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Уменьшите заголовок на ${length - MAX_TITLE_LENGTH} ${getWordEnding(length - MAX_TITLE_LENGTH, SYMBOL_WORDS)}`);
  } else {
    adTitleInput.setCustomValidity('');
  }

  adTitleInput.reportValidity();
};

const priceInputHandler = (evt) => {
  const priceValue = evt.target.value;
  if (priceValue > MAX_PRICE) {
    adPriceInput.setCustomValidity('Цена не может превышать 1 000 000 рублей');
  } else {
    adPriceInput.setCustomValidity('');
  }

  adPriceInput.reportValidity();
};

const capacityChangeHandler = () => {
  const roomsNumber = parseInt(adRoomSelect.value, 10);
  const guestsNumber = parseInt(adCapacitySelect.value, 10);

  if (roomsNumber !== PALACE_ROOM_COUNT && guestsNumber === PALACE_GUEST_COUNT ) {
    adCapacitySelect.setCustomValidity('Добавьте хотя бы одного гостя');
  } else if (roomsNumber < guestsNumber) {
    adCapacitySelect.setCustomValidity('Мало комнат для такого количества гостей. Увеличьте количество комнат или уменьшите количество гостей');
  } else if (roomsNumber === PALACE_ROOM_COUNT && guestsNumber !== PALACE_GUEST_COUNT ) {
    adCapacitySelect.setCustomValidity('Это помещение не для гостей');
  } else if (roomsNumber >= guestsNumber) {
    adCapacitySelect.setCustomValidity('');
  }

  adCapacitySelect.reportValidity();
};

const inputValidityHandler = (evt) => {
  const formElement = evt.target;
  const {valid} = formElement.validity;

  formElement.style.border = !valid ? STYLES.INVALID : STYLES.VALID;
};

const formSubmitHandler = (evt) => {
  capacityChangeHandler();

  evt.preventDefault();
  if (evt.target.checkValidity()) {
    const formData = new FormData(evt.target);
    sendData(onDataSuccess, onDataError, formData);
  }
};

const resetForm = () => {
  adForm.reset();
  mapFilters.reset();
  setDefaultAddress();
  resetMainMarker();
  mapReset();
  resetPhotos();
};

const buttonResetHandler = (evt) => {
  evt.preventDefault();
  resetForm();
};

const onDataSuccess = () => {
  successMessage();
  resetForm();
};

const onDataError = () => {
  errorMessage();
};

adRoomSelect.addEventListener('change', capacityChangeHandler);
adCapacitySelect.addEventListener('change', capacityChangeHandler);
invalidFormElements.forEach( element => element.addEventListener('change', inputValidityHandler))
typeSelector.addEventListener('change', priceChangeHandler);
timeInSelector.addEventListener('change', checkInChangeHandler);
timeOutSelector.addEventListener('change', checkOutChangeHandler);
adTitleInput.addEventListener('input', titleInputHandler);
adPriceInput.addEventListener('input', priceInputHandler);
adForm.addEventListener('submit', formSubmitHandler);
resetButton.addEventListener('click', buttonResetHandler);
priceChangeHandler();
