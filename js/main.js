const getRandomNumberInRange = (min, max) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Введите корректные значения');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloatInRange = (min, max, commaCount) => {
  if (min < 0 || max < 0 || min > max) {
    throw new Error('Введите корректные значения');
  }
  return Number((Math.random() * (max - min) + min).toFixed(commaCount));
}

const AUTHOR = {
  avatar: 'img/avatars/user{{xx}}.png',
};

const OFFER = {
  title: [
    'Уютное гнездышко для молодоженов',
    'Маленькая квартирка рядом с озером Комо',
    'Небольшая кормушка в парке',
    'Императорский дворец в центре Геленджика',
    'Милейший чердачок',
    'Тихая квартирка недалеко от метро',
    'Милое гнездышко для фанатов Анимэ',
    'Прекрасная хрущевке в Нижнем Киотово'
  ],
  address: [
    'location.x',
    'location.y'
  ],
  price: [
    // любое положительное число
  ],
  type: [
    'palace',
    'flat',
    'house',
    'bungalow'
  ],
  rooms: [
    // любое положительное число
  ],
  guests: [
    // любое положительное число
  ],
  checkin: [
    '12:00',
    '13:00',
    '14:00'
  ],
  checkout: [
    '12:00',
    '13:00',
    '14:00'
  ],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  description: [
    'У нас есть всё! Шприцы, интернет, кофе. Для всех кто знает толк в отдыхе. Полицию просим не беспокоить.',
    'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
    'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
    'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.'
  ],
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
};

const LOCATION = {
  x: [
    35.65000,
    35.70000
  ],
  y: [
    139.70000,
    139.80000
  ],
};

const AD_COUNT = 10;

const getRandomArrayElement = (dataArray) => {
  const randomizer = Math.floor(Math.random() * dataArray.length);
  return dataArray[randomizer];
}

const getRandomLocationX = getRandomFloatInRange(LOCATION.x[0], LOCATION.x[1], 5);
const getRandomLocationY = getRandomFloatInRange(LOCATION.y[0], LOCATION.y[1], 5);

const createAd = () => {
  return {
    title: getRandomArrayElement(OFFER.title),
    address: [getRandomLocationX, getRandomLocationY],
    price: getRandomNumberInRange(100, 1000000) + ' $ per day',
    rooms: getRandomNumberInRange(1, 100),
    guests: getRandomNumberInRange(0, 3),
    type: getRandomArrayElement(OFFER.type),
    checkin: getRandomArrayElement(OFFER.checkin),
    checkout: getRandomArrayElement(OFFER.checkout),
    description: getRandomArrayElement(OFFER.description),
    locationX: getRandomLocationX,
    locationY: getRandomLocationY,
  }
}

const SIMILAR_ADS = new Array(AD_COUNT).fill(null).map(createAd);

console.log(SIMILAR_ADS);

// для photos и features
//
// const getRandomArray = (array) => {
//   let newArray = [];
//   array.forEach((element) = {
//     if (getRandomNumberInRange(0,1)) {
//       return;
//     }
//     newArray.push(element);
//   })
//   return newArray;
// }
