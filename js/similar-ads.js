import {ads} from './create-ad.js';

const adCard = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

const renderCard = (advertisement) => {
  for (let i = 0; i < advertisement.length; i++) {
    const clonedCard = adCard.cloneNode(true);
    const typeOfPlace = () => {
      if (advertisement[i].offer.type === 'flat') {
        clonedCard.querySelector('.popup__type').textContent = 'Квартира';
      };

      if (advertisement[i].offer.type === 'palace') {
        clonedCard.querySelector('.popup__type').textContent = 'Дворец';
      };

      if (advertisement[i].offer.type === 'house') {
        clonedCard.querySelector('.popup__type').textContent = 'Дом';
      };

      if (advertisement[i].offer.type === 'bungalow') {
        clonedCard.querySelector('.popup__type').textContent = 'Бунгало';
      };
    };

    typeOfPlace();

    const createFeaturesList = () => {
      const featuresList = clonedCard.querySelector('.popup__features');
      const featuresListItem = featuresList.children;
      // featuresList.removeChild(featuresListItem[0]); не понимаю как удалить все вложенные уже в список лишки;
      for (let j = 0; j < advertisement[i].offer.features.length; j++) {
        let newFeature = document.createElement('li');
        newFeature.classList.add('popup__feature');
        newFeature.classList.add(`popup__feature--${advertisement[i].offer.features[j]}`);
        featuresList.appendChild(newFeature);
        newFeature.textContent = advertisement[i].offer.features[j];
      };
    };

    createFeaturesList();

    clonedCard.querySelector('.popup__avatar').src = advertisement[i].author.avatar;
    clonedCard.querySelector('.popup__title').textContent = advertisement[i].offer.title;
    clonedCard.querySelector('.popup__text--address').textContent = advertisement[i].offer.address;
    clonedCard.querySelector('.popup__text--price').textContent = `${advertisement[i].offer.price} ₽/ночь`;
    clonedCard.querySelector('.popup__text--capacity').textContent = `${advertisement[i].offer.rooms} комнаты для ${advertisement[i].offer.guests} гостей`;
    clonedCard.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement[i].offer.checkin}, выезд до ${advertisement[i].offer.checkout}`;
    clonedCard.querySelector('.popup__features').children.textContent = advertisement[i].offer.features;
    clonedCard.querySelector('.popup__description').textContent = advertisement[i].offer.description;
    clonedCard.querySelector('.popup__photos').src = advertisement[i].offer.photos;

    console.log(clonedCard);
  };
};

renderCard(ads);

// mapCanvas.appendChild(renderCard);
// console.log(mapCanvas);

export {renderCard};
