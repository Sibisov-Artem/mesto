
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
  editAvatarButton,
  changeAvatarPopup,
} from "../components/constants.js"

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmationRemove from "../components/PopupConfirmationRemove.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js"

let userId = null;

//используем Promise.all чтобы дождаться выполнения обоих запросов - getUser и getInitialCards )
Promise.all([api.getUser(), api.getInitialCards()]).then(([data, cards]) => {

  userInfo.setUserInfo(data);
  userId = data._id;
  cards.forEach(
    (item) => {
      cardsList.addItem(createCard(item))
    });
})
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


// попап профиля - форма профиля - редактирование профиля с редактированием на сервер
// и отображением на странице в разделе профиля
const profilePopupClass = new PopupWithForm('.popup_profile', (inputData) => {
  profilePopupClass.renderLoading(true);
  api.editUser(inputData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => profilePopupClass.renderLoading(false))
});

profilePopupClass.setEventListeners(); // вешаем обработчики (закрытия попапа, preventDefault, сброс формы при закрытии)

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const newCardPopupClass = new PopupWithForm('.popup_mesto', (inputData) => {
  newCardPopupClass.renderLoading(true);
  api.addNewCard(inputData)
    .then((data) => {
      cardsList.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => newCardPopupClass.renderLoading(false))
});
newCardPopupClass.setEventListeners();

//------------------------попап изменения аватара----------------------------//

const changeAvatarPopupClass = new PopupWithForm('.popup_avatar', (inputData) => {
  changeAvatarPopupClass.renderLoading(true);
  api.changeAvatar(inputData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => changeAvatarPopupClass.renderLoading(false))
});

changeAvatarPopupClass.setEventListeners();
//---------------------- попап подтверждения удаления карточки --------------//

const confirmRemovePopup = new PopupConfirmationRemove('.popup_confirmation-remove', (removeCard, cardId) => {
  api.deleteCard(cardId, removeCard)
    .then(() => {
      removeCard.deleteCard();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
});

confirmRemovePopup.setEventListeners();


//---------------------------попап просмотра картинок-----------------------------
const popupWithImage = new PopupWithImage('.popup_view'); //попап просмотра картинки

popupWithImage.setEventListeners();

function openPreviewPopup(name, link) {
  popupWithImage.open(name, link);
}


//----------------создание карточки (экземпляр класса Card в сочетании с лайк/оффлайк ) ---------------------

function createCard(data) {
  const card = new Card(data, '.card-template', openPreviewPopup, userId,
    (cardId, element) => confirmRemovePopup.open(element, cardId),
    (cardId) => {
      api.likeCard(cardId)
        .then((data) => {
          card.likeClickCount(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    },
    (cardId) => {
      api.deleteLikeCard(cardId)
        .then(data => {
          card.likeClickCount(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  );
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

//-------------подключение валидации к форме создания новой карточки--------------
const avatarValidator = new FormValidator(formsConfig, changeAvatarPopup);
avatarValidator.enableValidation();

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

//слушатель открытия попапа изменения аватара профиля
editAvatarButton.addEventListener('click', () => {
  changeAvatarPopupClass.open();
  avatarValidator.resetValidation();
});

//слушатель открытия попап создания новой карточки по кнопке
newCardButton.addEventListener('click', () => {
  newCardPopupClass.open();
  newCardValidator.resetValidation();
});


