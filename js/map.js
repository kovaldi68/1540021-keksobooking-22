/* global L:readonly */

import {
  disablePage,
  enablePage
} from './page-status.js';
import {renderAd} from './render-ad.js';

const MapSettings = {
  LAT: '35.68950',
  LNG: '139.69171',
  ZOOM: 9,
  LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

};

const MainPinSettings = {
  URL: '../img/main-pin.svg',
  SIZE: {
    X: 46,
    Y: 46,
  },
};

const PinSettings = {
  URL: '../img/pin.svg',
  SIZE: {
    X: 36,
    Y: 36,
  },
}

const address = document.querySelector('#address');

const setDefaultAddress = () => {
  address.value = `${MapSettings.LAT}, ${MapSettings.LNG}`;
};

disablePage();

const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
    setDefaultAddress();
  },
  )
  .setView({
    lat: MapSettings.LAT,
    lng: MapSettings.LNG,
  }, MapSettings.ZOOM);

L.tileLayer(
  MapSettings.LAYER, {
    attribution: MapSettings.ATTRIBUTION,
  },
).addTo(map);

const mapReset = () => {
  map.setView({
    lat: MapSettings.LAT,
    lng: MapSettings.LNG,
  }, MapSettings.ZOOM);
};

const mainMarkerIcon = L.icon ({
  iconUrl: MainPinSettings.URL,
  iconSize: [MainPinSettings.SIZE.X, MainPinSettings.SIZE.Y],
  iconAnchor: [MainPinSettings.SIZE.X / 2, MainPinSettings.SIZE.Y],
});

const mainMarker = L.marker (
  {
    lat: MapSettings.LAT,
    lng: MapSettings.LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('drag', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const resetMainMarker = () => {
  mainMarker.setLatLng([MapSettings.LAT, MapSettings.LNG]);
};

const pinsLayer = L.layerGroup();

const renderPins = (dataArray) => {
  dataArray.forEach((ad) => {

    const icon = L.icon ({
      iconUrl: PinSettings.URL,
      iconSize: [PinSettings.SIZE.X, PinSettings.SIZE.Y],
      iconAnchor: [PinSettings.SIZE.X / 2, PinSettings.SIZE.Y],
    });

    const marker = L.marker (
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon: icon,
      },
    );

    marker
      .bindPopup(renderAd(ad));
    pinsLayer.addLayer(marker);
  });

  pinsLayer.addTo(map);
};

const clearPins = () => {
  pinsLayer.clearLayers();
};

export {renderPins, setDefaultAddress, resetMainMarker, mapReset, clearPins};
