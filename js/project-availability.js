const adForm = document.querySelector('.ad-form');
const adFields = Array.from(adForm.children);
const mapContainer = document.querySelector('.map__filters');
const mapFilters = Array.from(mapContainer.children);

adForm.classList.add('ad-form--disabled');
mapContainer.classList.add('map__filters--disabled');

const setDisable = (array) => {
  array.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

setDisable(adFields);
setDisable(mapFilters);

export {
  adForm,
  adFields,
  mapContainer,
  mapFilters
};
