/* global L:readonly */

import {setDefaultAddress, mainMarker, MapSettings} from './map.js';
import {adForm} from './page-status.js';
import {showAlert} from './util.js';
import {renderPins} from './map.js';

const successPost = document.querySelector('#success').content.querySelector('.success');
const errorPost = document.querySelector('#error').content.querySelector('.error');
const latLng = L.latLng(MapSettings.LAT, MapSettings.LNG);
const main = document.querySelector('main');
const resetButton = document.querySelector('.ad-form__reset');
const errorButton = errorPost.querySelector('.error__button');

const showMessage = (postType) => {
  postType.style.zIndex = 500;
  main.appendChild(postType).cloneNode(true);
};

const removeMessage = (postType) => {
  main.removeChild(postType);
};

const resetForm = () => {
  adForm.reset();
  setDefaultAddress();
  mainMarker.setLatLng(latLng);
};

const dataGetHandler = () => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error (`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      renderPins(data);
    })
    .catch(() => {
      showAlert('Данные ближайших объявлений не удалось загрузить!');
    })

};

const dataSendHandler = (evt) => {
  const formData = new FormData(evt.target);

  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        showMessage(successPost);
        resetForm();
      } else {
        throw new Error (`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => {
      showMessage(errorPost)
    })
};

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    removeMessage(successPost);
    removeMessage(errorPost);
  }
});

dataGetHandler();
// window.addEventListener('click', removeMessage(successPost));
// window.addEventListener('click', removeMessage(errorPost));
// errorButton.addEventListener('click', removeMessage(errorButton));
adForm.addEventListener('submit', dataSendHandler);
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
})
