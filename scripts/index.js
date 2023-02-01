const popupAll = document.querySelector('.popup'); //все попапы

const popupProfile = document.querySelector('.popup_profile'); //попап профиля
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');

const profileName = profile.querySelector('.profile__name'); //имя профиля
const profileDescription = profile.querySelector('.profile__description'); //описание профиля
const editButton = profile.querySelector('.profile__edit-btn');  //кнопка открытия попап профиля

const formElementProfile = popupProfile.querySelector('.form__profile'); //форма попап профиля
const popupProfileName = popupProfile.querySelector('.form__item_el_name'); //поле имени профиля
const popupProfileDescription = popupProfile.querySelector('.form__item_el_description'); //поле описания профиля

const popupProfileCloseButton = document.querySelector('.popup_profile__close-btn'); //кнопка закрытия попап профиля

const popupMesto = document.querySelector('.popup_mesto'); //попап добавления места

const mestoAddButton = profile.querySelector('.profile__add-btn'); //кнопка открытия попап добавления места

const popupMestoCloseButton = document.querySelector('.popup_mesto__close-btn'); //кнопка закрытия попап добавления места

const likeButton = document.querySelectorAll('.place__like-btn'); //кнопка лайк


// функция открытия попап профиля
function openPopupProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popupProfile.classList.add('popup_opened');
}

// функция закрытия попап профиля
function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

// функция сохранения профиля
function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  closePopupProfile(popupProfile);
}

// функция открытия попап добавления места
function openPopupMesto() {
  popupMesto.classList.add('popup_opened');
}

// функция закрытия попап добавления места
function closePopupMesto() {
  popupMesto.classList.remove('popup_opened');
}


editButton.addEventListener('click', openPopupProfile); //слушатель открытия попап профиля по кнопке редактирования профиля

popupProfileCloseButton.addEventListener('click', closePopupProfile); //слушатель закрытия попап профиля по кнопке закрытия

formElementProfile.addEventListener('submit', saveProfile); //слушатель сохранения профиля

mestoAddButton.addEventListener('click', openPopupMesto); //слушатель открытия попап добавления места по кнопке добавления места

popupMestoCloseButton.addEventListener('click', closePopupMesto); //слушатель закрытия попап профиля по кнопке закрытия


// переключатель лайков на карточки
likeButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-btn_active');
  });
});
