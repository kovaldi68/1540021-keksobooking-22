const avatarPicker = document.querySelector('.ad-form-header__input');
const adPhotoPicker = document.querySelector('.ad-form__input');
const adPhotoPreview = document.querySelector('.ad-form__photo');
const avatarPreview = document.querySelector('.ad-form-header__preview');

const addAvatar = () => {
  avatarPreview.innerHTML = '';
  const newAvatar = document.createElement('img');
  newAvatar.classList.add('ad-form-header__img');
  newAvatar.alt = 'Аватар пользователя';
  newAvatar.width = '40';
  newAvatar.height = '40';
  avatarPreview.appendChild(newAvatar);

  return newAvatar;
};

const addAdPhoto = () => {
  const newPhoto = document.createElement('img');
  newPhoto.classList.add('ad-form__img');
  newPhoto.alt = 'Фотография помещения';
  newPhoto.width = '70';
  newPhoto.height = '70';
  adPhotoPreview.appendChild(newPhoto);

  return newPhoto;
};

const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

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

const resetAvatar = (ImageSRC) => {
  addAvatar().src = ImageSRC;
};

const resetAdPhotos = () => {
  adPhotoPreview.innerHTML = '';
};


uploadImage(avatarPicker, addAvatar);
uploadImage(adPhotoPicker, addAdPhoto);

export {resetAvatar, resetAdPhotos};
