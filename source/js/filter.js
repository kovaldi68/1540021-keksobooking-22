import {renderPins, clearPins} from './map.js';
import {debounce} from './util.js';

const filterForm = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');

const RERENDER_DELAY = 500;
const MAX_RERENDER_PINS_COUNT = 10;
const DEFAULT_VALUE = 'any';
const HIGH_PRICE = 'high';
const MIDDLE_PRICE = 'middle';
const LOW_PRICE = 'low';
const PRICE_RATE = {
  LOW: 10000,
  HIGH: 50000,
};

const filterByType = (card) => {
  return card.offer.type === typeFilter.value || typeFilter.value === DEFAULT_VALUE;
};

const filterByPrice = (card) => {
  if (priceFilter.value === HIGH_PRICE) {
    return card.offer.price > PRICE_RATE.HIGH;
  }
  if (priceFilter.value === MIDDLE_PRICE) {
    return card.offer.price <= PRICE_RATE.HIGH && card.offer.price >= PRICE_RATE.LOW;
  }
  if (priceFilter.value === LOW_PRICE) {
    return card.offer.price < PRICE_RATE.LOW
  }

  return priceFilter.value === DEFAULT_VALUE;
};

const filterByRooms = (card) => {
  return card.offer.rooms === parseInt(roomsFilter.value, 10) || roomsFilter.value === DEFAULT_VALUE;
};

const filterByCapacity = (card) => {
  return card.offer.guests === parseInt(guestsFilter.value, 10) || guestsFilter.value === DEFAULT_VALUE;
};

const filterByFeatures = (card) => {
  const checkedFeatures = Array.from(featuresFilter.querySelectorAll('input:checked'));

  if (checkedFeatures.length === 0) {
    return true;
  }

  return checkedFeatures.every((feature) => card.offer.features.includes(feature.value));
};

const filterPins = (data) => {
  const filteredArray = [];

  for (let i = 0; i < data.length; i++) {
    if (filterByType(data[i]) && filterByPrice(data[i]) && filterByRooms(data[i]) && filterByCapacity(data[i]) && filterByFeatures(data[i]) && filteredArray.length <= MAX_RERENDER_PINS_COUNT) {
      filteredArray.push(data[i]);
    }
  }
  return filteredArray;
};

const rerenderPins = debounce((data) => {
  const filteredPins = filterPins(data);
  clearPins();
  renderPins(filteredPins);
}, RERENDER_DELAY);


const setFilterListener = (data) => {
  filterForm.addEventListener('change', () => {
    rerenderPins(data);
  });
  filterForm.addEventListener('reset', () => {
    rerenderPins(data);
  });
};

export {setFilterListener};
