import {getWordEnding} from './util.js';

const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adRoomSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');
const invalidFormElements = adForm.querySelectorAll('input:invalid, select:invalid');

const SYMBOL_WORDS = ['символ', 'символа', 'символов'];
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const PALACE_ROOM_COUNT = 100;
const PALACE_GUEST_COUNT = 0;
const STYLES = {
  INVALID: '2px dashed orange',
  VALID: '1px solid green',
};

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
  }
  else {
    adPriceInput.setCustomValidity('');
  }

  adPriceInput.reportValidity();
};

const capacityChangeHandler = (evt) => {
  const roomsNumber = parseInt(adRoomSelect.value, 10);
  const guestsNumber = parseInt(adCapacitySelect.value, 10);

  if (roomsNumber !== PALACE_ROOM_COUNT && guestsNumber === PALACE_GUEST_COUNT ) {
    adCapacitySelect.setCustomValidity('Добавьте хотя бы одного гостя');
    evt.preventDefault();
  } else if (roomsNumber < guestsNumber) {
    adCapacitySelect.setCustomValidity('Мало комнат для такого количества гостей. Увеличьте количество комнат или уменьшите количество гостей');
    evt.preventDefault();
  } else if (roomsNumber === PALACE_ROOM_COUNT && guestsNumber !== PALACE_GUEST_COUNT ) {
    adCapacitySelect.setCustomValidity('Это помещение не для гостей');
    evt.preventDefault();
  } else if (roomsNumber >= guestsNumber) {
    adCapacitySelect.setCustomValidity('');
  }
};

const getInvalidStyle = () => {
  invalidFormElements.forEach((value) => {
    value.style.border = STYLES.INVALID;
  })
};


const getValidityStyle = () => {
  invalidFormElements.forEach((value) => {
    value.addEventListener('change', () => {
      if (value.validity.tooShort === true || value.validity.tooLong === true || value.validity.valueMissing === true) {
        value.style.border = STYLES.INVALID;
      }
      if (value.validity.tooShort === false && value.validity.tooLong === false && value.validity.valueMissing === false) {
        value.style.border = STYLES.VALID;
      }
    })
  })
};

adTitleInput.addEventListener('input', titleInputHandler);
adPriceInput.addEventListener('input', priceInputHandler);
adRoomSelect.addEventListener('change', capacityChangeHandler);
adCapacitySelect.addEventListener('change', capacityChangeHandler);
adForm.addEventListener('submit', capacityChangeHandler);
getInvalidStyle();
getValidityStyle();
