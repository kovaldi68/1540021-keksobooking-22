const adForm = document.querySelector('.ad-form');
const adFields = Array.from(adForm.children);
const mapContainer = document.querySelector('.map__filters');
const mapFilters = Array.from(mapContainer.children);

const toggleElemAvailability = (array, state) => {
  array.forEach((element) => {
    element.disabled = state;
  });
}

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapContainer.classList.add('map__filters--disabled');
  toggleElemAvailability(adFields, true);
  toggleElemAvailability(mapFilters, true);
}

const enablePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapContainer.classList.remove('map__filters--disabled');
  toggleElemAvailability(adFields, false);
  toggleElemAvailability(mapFilters, false);
}

export {
  disablePage,
  enablePage
};
