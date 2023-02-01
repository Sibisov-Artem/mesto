const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');  //кнопка редактирования профиля

const mestoAddButton = profile.querySelector('.profile__add-btn'); // кнопка добавления места

const likeButton = document.querySelectorAll('.place__like-btn'); //кнопка лайк

const popupMesto = document.querySelector('.popup_mesto');

const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const popupProfileName = popupProfile.querySelector('.form__item_el_name');
const popupProfileDescription = popupProfile.querySelector('.form__item_el_description');

const popupCloseButton = popup.querySelectorAll('.popup__close-btn');

const formElement = popup.querySelector('.form');

function openPopupEditProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popupProfile.classList.add('popup_opened');
}

function openPopupMesto() {
  popupMesto.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopupEditProfile);

mestoAddButton.addEventListener('click', openPopupMesto);

// popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', saveProfile);

likeButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-btn_active');
  });
});





// const popupCloseButton = popup.querySelectorAll('.popup__close-btn');
popupCloseButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    evt.target.classList.toggle('popup_opened');
  });
});
