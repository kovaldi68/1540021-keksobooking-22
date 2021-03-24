import {createImage} from './util.js';

const avatarPicker = document.querySelector('.ad-form-header__input');
const adPhotoPicker = document.querySelector('.ad-form__input');
const adPhotoPreview = document.querySelector('.ad-form__photo');
const avatarPreview = document.querySelector('.ad-form-header__preview');

const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

const addAvatar = () => {
  avatarPreview.innerHTML = '';
  const newAvatar = avatarPreview.appendChild(createImage('ad-form-header__img', 'Аватарка пользователя', 40, 40));

  return newAvatar;
};

const addAdPhoto = () => {
  const newPhoto = adPhotoPreview.appendChild(createImage('ad-form__img', 'Фотография помещения'));

  return newPhoto;
};


const uploadImage = (input, addFunc) => {
  input.addEventListener('change', () => {
    const image = input.files[0];
    const imageName = image.name.toLowerCase();

    const matches = IMAGE_TYPES.some((it) => {
      return imageName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        addFunc().src = reader.result;
      });

      reader.readAsDataURL(image);
    }
  });
};

const resetPhotos = () => {
  addAvatar().src = DEFAULT_AVATAR_SRC;
  adPhotoPreview.innerHTML = '';
};


uploadImage(avatarPicker, addAvatar);
uploadImage(adPhotoPicker, addAdPhoto);

export {resetPhotos};
