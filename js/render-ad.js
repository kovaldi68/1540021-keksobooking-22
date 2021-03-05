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
  for (let i = 0; i < features.length; i++) {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', `popup__feature--${features[i]}`);
    parentBlock.appendChild(newFeature);
  };
};

const renderAdPhotos = (photos, photoGallery) => {
  for (let j = 0; j < photos.length; j++) {
    const newPhoto = document.createElement('img');
    newPhoto.src = photos[j];
    newPhoto.width = '45';
    newPhoto.height = '40';
    newPhoto.alt = "Фотография жилья";
    photoGallery.appendChild(newPhoto);
  };
};

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
  clonedCard.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
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
console.log(card);

export {renderAd};
