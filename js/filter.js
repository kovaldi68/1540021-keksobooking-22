import { renderPins, clearPins} from './map.js';

const filterForm = document.querySelector('.map__filters');
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('.map__features');

const MAX_RERENDER_PINS_COUNT = 10;

const filterPins = (data) => data.filter((card) => {
  return (card.offer.type === typeFilter.value || typeFilter.value === 'any');
});

const rerenderPins = (data) => {
  const filteredPins = filterPins(data);
  clearPins();
  renderPins(filteredPins.slice(0, MAX_RERENDER_PINS_COUNT));
};

const setFilterListener = (data) => {
  filterForm.addEventListener('change', () => {
    rerenderPins(data);
  });
};

export {setFilterListener};
