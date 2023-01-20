let popup = document.querySelector('.popup');
let page = document.querySelector('.page');
let content = page.querySelector('.content');
let profile = content.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-btn');

let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
let popupProfileName = popup.querySelector('.form__item_el_name');
let popupProfileDescription = popup.querySelector('.form__item_el_description');

let popupCloseButton = popup.querySelector('.popup__close-btn');

let formElement = popup.querySelector('.form');

function popupOpen() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

formElement.addEventListener('submit', saveProfile);
