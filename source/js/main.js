import 'leaflet';
import 'leaflet/dist/leaflet.css'
import './page-status.js';
import './form.js';
import {fetchData} from './api.js';
import {renderPins} from './map.js';
import {showAlert} from './util.js';
import {setFilterListener} from './filter.js';
import './upload-image.js';

const MAX_PINS_NUMBER = 10;

const onDataSuccess = (data) => {
  renderPins(data.slice(0, MAX_PINS_NUMBER));
  setFilterListener(data);
};

const onDataError = () => showAlert();

fetchData(onDataSuccess, onDataError);
