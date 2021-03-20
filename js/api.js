const ALERT_MESSAGE = 'Данные ближайших объявлений не удалось загрузить!';
const API_URL = 'https://22.javascript.pages.academy/keksobooking';

const fetchData = (onSuccess, onFail) => {
  return fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail(ALERT_MESSAGE);
    })

};

const sendData = (onSuccess, onFail, formData) => {
  formData();

  fetch(
    API_URL,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
    })
    .catch(() => {
      onFail();
    })
};

export {fetchData, sendData};
