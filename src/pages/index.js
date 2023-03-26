import "./index.css";

import {
  initialCards,
  formsConfig,
  profilePopup,
  editProfileButton,
  profileNameInput,
  profileDescriptionInput,
  newCardPopup,
  newCardButton,
  listForCards,
  newCardTitleInput,
  newCardUrlInput,
} from "../components/constants.js"

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const profilePopupClass = new PopupWithForm('.popup_profile', () => {
  userInfo.setUserInfo('.popup__input_el_name', '.popup__input_el_description');
});

profilePopupClass.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description');

const newCardPopupClass = new PopupWithForm('.popup_mesto', () => {
  cardsList.addItem(createCard(newCardTitleInput.value, newCardUrlInput.value));
});

newCardPopupClass.setEventListeners();


//---------------------------попап просмотра картинок-----------------------------
const handleCardClick = new PopupWithImage('.popup_view'); //попап просмотра картинки

handleCardClick.setEventListeners();

function openPreviewPopup(name, link) {
  handleCardClick.open(name, link);
}
//----------------создание карточки (экземпляр класса Card ) ---------------------

function createCard(name, link) {
  const card = new Card(name, link, '.card-template', openPreviewPopup);
  const cardElement = card.createCard();
  return cardElement;
}


//---------------подключение валидации к форме профиля----------------------------
//----------------через создание экземпляра класса FormValidator------------------
const profileValidator = new FormValidator(formsConfig, profilePopup);
profileValidator.enableValidation();

//----------подключение валидации к форме создания новой карточки-----------------
//------------- через создание экземпляра класса FormValidator--------------------
const newCardValidator = new FormValidator(formsConfig, newCardPopup);
newCardValidator.enableValidation();
//--------------------------------------------------------------------------------


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    cardsList.addItem(card);

  }
}, listForCards
);

cardsList.renderItems();


// ------------------------------------слушатели----------------------------------

//слушатель открытия попап профиля по кнопке редактирования профиля
editProfileButton.addEventListener('click', () => {
  profilePopupClass.open();
  const userGetData = userInfo.getUserInfo();
  profileNameInput.value = userGetData.name;
  profileDescriptionInput.value = userGetData.info;

  profileValidator.resetValidation();
}
);

//слушатель открытия попап создания новой карточки по кнопке
newCardButton.addEventListener('click', () => {
  newCardPopupClass.open();
  newCardTitleInput.value = ''; //чтобы очищалось поле при открывании
  newCardUrlInput.value = ''; //чтобы очищалось поле при открывании
  newCardValidator.resetValidation();
});
