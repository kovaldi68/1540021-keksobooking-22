import {
  adForm,
  adFields,
  mapContainer,
  mapFilters
} from './project-availability.js';
import {ads} from './create-ad.js';
import {card} from './render-ad.js';

const address = document.querySelector('#address');

const setEnable = (array) => {
  array.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

const map = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    mapContainer.classList.remove('map__filters--disabled');
    setEnable(adFields);
    setEnable(mapFilters);
    address.value = '35.68950, 139.69171'  //сделать координаты
  },
  )
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon ({
  iconUrl: '../img/main-pin.svg',
  iconSize: [46, 46],
  iconAnchor: [23, 46],
});

const mainMarker = L.marker (
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
})

ads.forEach(({location}) => {

  const icon = L.icon ({
    iconUrl: '../img/pin.svg',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  const marker = L.marker (
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon: icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(card);
});

