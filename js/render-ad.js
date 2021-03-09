import {ads} from './create-ad.js';

const adCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

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

const guestWords = ['гостя', 'гостей'];
const roomWords = ['комнат', 'комната', 'комнаты'];
const exceptions = [11, 12, 13, 14];

const guestEnding = (number, textForms) => {
  if (number%10 == 1 && number%10 != 11) {
    return textForms[0];
  }

  return textForms[1];
}

const roomEnding = (number, textForms) => {
  if (exceptions.includes(number)) {
    return textForms[0];
  }
  if (number%10 > 1 && number%10 < 5) {
    return textForms[2];
  }
  if (number%10 == 1 && number != 11) {
    return textForms[1];
  }

  return textForms[0];
}

const renderAd = ( {author, offer} ) => {
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
  clonedCard.querySelector('.popup__text--capacity').textContent = `${rooms} ${roomEnding(rooms, roomWords)} для ${guests} ${guestEnding(guests, guestWords)}`;
  clonedCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  clonedCard.querySelector('.popup__description').textContent = description;

  featuresList.innerHTML = '';
  renderFeaturesList(features, featuresList);

  photosList.innerHTML = '';
  renderAdPhotos(photos, photosList);

  return clonedCard;
};


const card = renderAd(ads[0]);
mapCanvas.appendChild(card);

export {renderAd};
