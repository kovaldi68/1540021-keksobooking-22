import './page-status.js';
import './form.js';
import {fetchData} from './api.js';
import {renderPins} from './map.js';
import {showAlert} from './util.js';

const onDataSuccess = (data) => renderPins(data);

const onDataError = () => showAlert();

fetchData(onDataSuccess, onDataError);
