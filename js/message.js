import {isEscEvent} from './util.js';

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const successMessageHandler = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessEscHandler);
  document.removeEventListener('click', onSuccessClickHandler);
};

const errorMessageHandler = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorEscHandler);
  document.removeEventListener('click', onErrorClickHandler);
};

const onSuccessEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successMessageHandler();
  }
};

const onErrorEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    errorMessageHandler();
  }
};

const onSuccessClickHandler = () => {
  successMessageHandler();
};

const onErrorClickHandler = () => {
  errorMessageHandler();
};

const successMessage = () => {
  const clonedMessage = successTemplate.cloneNode(true);
  clonedMessage.style.zIndex = 500;
  main.appendChild(clonedMessage);

  document.addEventListener('keydown', onSuccessEscHandler);
  document.addEventListener('click', onSuccessClickHandler);
};

const errorMessage = () => {
  const clonedMessage = errorTemplate.cloneNode(true);
  clonedMessage.style.zIndex = 500;
  main.appendChild(clonedMessage);

  document.addEventListener('keydown', onErrorEscHandler);
  document.addEventListener('click', onErrorClickHandler);
};

export {successMessage, errorMessage};
