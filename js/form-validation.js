import {getWordEnding} from './util.js';

const adForm = document.querySelector('.ad-form');
const adTitleInput = adForm.querySelector('#title');
const adPriceInput = adForm.querySelector('#price');
const adRoomSelect = adForm.querySelector('#room_number');
const adCapacitySelect = adForm.querySelector('#capacity');

const SYMBOL_WORDS = ['символ', 'символа', 'символов'];
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const FormSettings = {
  METHOD: 'POST',
  ACTION: 'https://22.javascript.pages.academy/keksobooking',
  ENCTYPE: 'multipart/form-data',
};

const formSetUp = () => {
  adForm.method = FormSettings.METHOD;
  adForm.action = FormSettings.ACTION;
  adForm.enctype = FormSettings.ENCTYPE;
};

formSetUp();

// Если я правильно понял, то в этом куске кода нет смысла, работает или событие input или invalid.
// Оставил на всякий случай оба, но наверное его нужно будет удалить.

// adTitleInput.addEventListener('invalid', () => {
//   if (adTitleInput.validity.tooShort) {
//     adTitleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
//   } else if (adTitleInput.validity.tooLong) {
//     adTitleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
//   } else if (adTitleInput.validity.valueMissing) {
//     adTitleInput.setCustomValidity('Поле является обязательным для заполнения');
//   } else {
//     adTitleInput.setCustomValidity('');
//   }
// });

adTitleInput.addEventListener('input', () => {
  const adTitleLength = adTitleInput.value.length;
  if (adTitleLength < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Введите ещё ${MIN_TITLE_LENGTH - adTitleLength} ${getWordEnding(MIN_TITLE_LENGTH - adTitleLength, SYMBOL_WORDS)}`);
  } else if (adTitleLength > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Уменьшите заголовок на ${adTitleLength - MAX_TITLE_LENGTH} ${getWordEnding(adTitleLength - MAX_TITLE_LENGTH, SYMBOL_WORDS)}`);
  } else {
    adTitleInput.setCustomValidity('');
  }

  adTitleInput.reportValidity();
});

adPriceInput.addEventListener('input', () => {
  const adPriceValue = adPriceInput.value;
  if (adPriceValue > MAX_PRICE) {
    adPriceInput.setCustomValidity('Цена не может превышать 1 000 000 рублей');
  }
  else {
    adPriceInput.setCustomValidity('');
  }

  adPriceInput.reportValidity();
});

// Начиная с этих строк я вообще ни в чем не уверен.

const roomCheck = () => {
  const roomsNumber = parseInt(adRoomSelect.value, 10);
  const guestsNumber = parseInt(adCapacitySelect.value, 10);

  if (roomsNumber !== 100 && guestsNumber === 0 ) {
    adRoomSelect.setCustomValidity('Добавьте хотя бы одного гостя');
  } else if (roomsNumber < guestsNumber) {
    adRoomSelect.setCustomValidity('Мало комнат для такого количества гостей.Увеличьте количество комнат или уменьшите количество гостей');
  } else if (roomsNumber === 100 && guestsNumber !== 0 ) {
    adRoomSelect.setCustomValidity('Это помещение не для гостей');
  } else if (roomsNumber >= guestsNumber) {
    adRoomSelect.setCustomValidity('');
  }

  adRoomSelect.reportValidity();
};

roomCheck();

const guestCheck = () => {
  const roomsNumber = parseInt(adRoomSelect.value, 10);
  const guestsNumber = parseInt(adCapacitySelect.value, 10);

  if (roomsNumber !== 100 && guestsNumber === 0 ) {
    adCapacitySelect.setCustomValidity('Добавьте хотя бы одного гостя');
  } else if (roomsNumber < guestsNumber) {
    adCapacitySelect.setCustomValidity('Много гостей, выберите количество гостей меньше или равное количеству комнат');
  } else if (roomsNumber === 100 && guestsNumber !== 0 ) {
    adCapacitySelect.setCustomValidity('Это помещение не для гостей');
  } else if (roomsNumber >= guestsNumber) {
    adCapacitySelect.setCustomValidity('');
  }

  adCapacitySelect.reportValidity();
};

guestCheck();

adRoomSelect.addEventListener('change', roomCheck);
adCapacitySelect.addEventListener('change', guestCheck);


const invalidInputs = adForm.querySelectorAll('input:invalid, select:invalid');

const invalidStyling = () => {
  invalidInputs.forEach((value) => {
    value.style.border = '2px dashed orange';
  })
};

invalidStyling();

const getInvalidStyle = () => {
  invalidInputs.forEach((value) => {
    value.addEventListener('change', () => {
      if (value.validity.tooShort === false || value.validity.tooLong === false || value.validity.valueMissing === false) {
        value.style.border = '2px dashed orange';
      }
    })
  })
};

getInvalidStyle();

const getValidStyle = () => {
  invalidInputs.forEach((value) => {
    value.addEventListener('change', () => {
      if (value.validity.tooShort === false && value.validity.tooLong === false && value.validity.valueMissing === false) {
        value.style.border = '1px solid green';
      }
    })
  })
};

getValidStyle();
