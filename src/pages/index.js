
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
import { api } from "../components/Api.js"

let userId = null;

//первоначальная загрузка данных о пользователе с сервера
//вникнуть, углубиться в процесс, как оно подтягивается...

//используем Promise.all чтобы дождаться выполнения обоих запросов)
Promise.all([api.getUser(), api.getInitialCards()]).then(([data, cards]) => {

  userInfo.setUserInfo(data); console.log(data);

  cards.forEach(
    (item) => {
      cardsList.addItem(createCard(item))
    });

  })

//тут не то набарагозил, здесь нужно сделать обновление информации, а я сделал подтягивание инфо с сервера
const profilePopupClass = new PopupWithForm('.popup_profile', (data) => {
  const profileSaveBtn = document.querySelector('.popup__save-btn');
  profileSaveBtn.textContent = 'Сохранение...';
  api.getUser(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profileSaveBtn.textContent = 'Сохранить')

});

profilePopupClass.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const newCardPopupClass = new PopupWithForm('.popup_mesto', (item) => {
  cardsList.addItem(createCard(item));
});

newCardPopupClass.setEventListeners();

//---------------------------попап просмотра картинок-----------------------------
const handleCardClick = new PopupWithImage('.popup_view'); //попап просмотра картинки

handleCardClick.setEventListeners();

function openPreviewPopup(name, link) {
  handleCardClick.open(name, link);
}
//----------------создание карточки (экземпляр класса Card в сочетании с api ) ---------------------
//id пользователя затолкать в Card для определения своих карт от не своих

function createCard(data) {
  const card = new Card(data, '.card-template', openPreviewPopup);
  const cardElement = card.createCard();
  return cardElement;
}

//убираем заготовленный список карточек initialCards и оставляем пустой массив объектов - items: []
const cardsList = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item);
    cardsList.addItem(card);

  }
}, listForCards
);

cardsList.renderItems();

//---------------подключение валидации к форме профиля----------------------------
//----------------через создание экземпляра класса FormValidator------------------
const profileValidator = new FormValidator(formsConfig, profilePopup);
profileValidator.enableValidation();

//----------подключение валидации к форме создания новой карточки-----------------
//------------- через создание экземпляра класса FormValidator--------------------
const newCardValidator = new FormValidator(formsConfig, newCardPopup);
newCardValidator.enableValidation();
//--------------------------------------------------------------------------------

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


