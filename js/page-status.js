const adForm = document.querySelector('.ad-form');
const adFields = Array.from(adForm.children);
const mapContainer = document.querySelector('.map__filters');
const mapFilters = Array.from(mapContainer.children);

const toggleElemAvailability = (array) => {
  array.forEach((element) => {
    if (element.disabled) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  });
}

const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapContainer.classList.add('map__filters--disabled');
  toggleElemAvailability(adFields);
  toggleElemAvailability(mapFilters);
}

const enablePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapContainer.classList.remove('map__filters--disabled');
  toggleElemAvailability(adFields);
  toggleElemAvailability(mapFilters);
}

export {
  disablePage,
  enablePage
};
