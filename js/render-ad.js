import {getWordEnding} from './util.js';

const adCard = document.querySelector('#card').content.querySelector('.popup');
const GUEST_WORDS = ['гостя', 'гостей', 'гостей'];
const ROOM_WORDS = ['комната', 'комнаты', 'комнат'];

const typesMap = {
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  palace: 'Дворец',
};

const renderFeaturesList = (features, parentBlock) => {
  features.forEach((value) => {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${value}`);
    parentBlock.appendChild(newFeature);
  });
};

const renderAdPhotos = (photos, photoGallery) => {
  photos.forEach((value) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = value;
    newPhoto.width = '45';
    newPhoto.height = '40';
    newPhoto.alt = 'Фотография жилья';
    photoGallery.appendChild(newPhoto);
  });
};

const renderAd = ( {author, offer, location} ) => {
  const {
    title,
    features,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    photos,
  } = offer;

  const clonedCard = adCard.cloneNode(true);
  const featuresList = clonedCard.querySelector('.popup__features');
  const photosList = clonedCard.querySelector('.popup__photos');

  clonedCard.querySelector('.popup__avatar').src = author.avatar;
  clonedCard.querySelector('.popup__title').textContent = title;
  clonedCard.querySelector('.popup__type').textContent = typesMap[type];
  clonedCard.querySelector('.popup__text--address').textContent = address;
  clonedCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  clonedCard.querySelector('.popup__text--capacity').textContent = `${rooms} ${getWordEnding(rooms, ROOM_WORDS)} для ${guests} ${getWordEnding(guests, GUEST_WORDS)}`;
  clonedCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  clonedCard.querySelector('.popup__description').textContent = description;

  featuresList.innerHTML = '';
  renderFeaturesList(features, featuresList);

  photosList.innerHTML = '';
  renderAdPhotos(photos, photosList);

  return clonedCard;
};

export {renderAd};
