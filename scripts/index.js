import Card from "./Card.js";
import FormValidator from "./FormValidator.js";


//набор карточек для отображения
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// -------------------------------------------------------------------------------
// объект классов для приема к функции enableValidation
const formsConfig = {
  formSelector: '.popup__form', // форма
  inputSelector: '.popup__input', //поле
  submitButtonSelector: '.popup__submit-btn', //кнопка сохранить/создать
  inactiveButtonClass: 'popup__submit-btn_disabled', // неактивная кнопка
  inputErrorClass: 'popup__input_type_error', // input выделение поля красной линией, показывая что есть ошибка валидации
  errorClass: 'popup__input-error_active' // делаем текст ошибки в span под input'ом видимым за счет opacity:1
}

// -------------------------------------------------------------------------------
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const popupAll = document.querySelectorAll('.popup'); // использую для закрытия по оверлею

//---------------------------попап профиль----------------------------------------
const profilePopup = document.querySelector('.popup_profile'); //попап профиля
const profileName = profile.querySelector('.profile__name'); //имя профиля
const profileDescription = profile.querySelector('.profile__description'); //описание профиля
const editProfileButton = profile.querySelector('.profile__edit-btn');  //кнопка открытия попап профиля
const profileForm = profilePopup.querySelector('.popup__form_profile'); //форма попап профиля
const profileNameInput = profilePopup.querySelector('.popup__input_el_name'); //поле имени профиля
const profileDescriptionInput = profilePopup.querySelector('.popup__input_el_description'); //поле описания профиля

//---------------------------попап создания нвоой карточки------------------------
const newCardPopup = document.querySelector('.popup_mesto'); //попап добавления места
const newCardButton = profile.querySelector('.profile__add-btn'); //кнопка открытия попап добавления места

const listForCards = document.querySelector('.place__grid'); // список, внутрь которого будут вставать карточки
const newCardForm = document.querySelector('.popup__form_mesto'); //форма попап добавления места
const newCardTitleInput = document.querySelector('.popup__input_el_mesto-title'); //поле имени места
const newCardUrlInput = document.querySelector('.popup__input_el_mesto-url'); //поле адреса картинки

//---------------------------попап просмотра картинок-----------------------------
const previewPopup = document.querySelector('.popup_view'); //попап просмотра картинки
const previewImage = document.querySelector('.popup__image'); // картинка просмотра
const imageCaption = document.querySelector('.popup__image-caption'); // описание к картинке



// ----------------------------------функции--------------------------------------


//----------------создание карточки (экземпляр класса Card ) ---------------------

function createCard(name, link) {
  const card = new Card(name, link, '.card-template', openPreviewPopup);
  const cardElement = card.createCard();
  return cardElement;
}
//--------------------------------------------------------------------------------

//---------------подключение валидации к форме профиля----------------------------
//----------------через создание экземпляра класса FormValidator------------------
const profileValidator = new FormValidator(formsConfig, profilePopup);
profileValidator.enableValidation();

//----------подключение валидации к форме создания новой карточки-----------------
//------------- через создание экземпляра класса FormValidator--------------------
const newCardValidator = new FormValidator(formsConfig, newCardPopup);
newCardValidator.enableValidation();
//--------------------------------------------------------------------------------

//  функция открытия попап просмотра картинки
function openPreviewPopup(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  imageCaption.textContent = name;
  openPopup(previewPopup);
}

// функция отображения карточек
function renderCards(name, link) {
  const card = createCard(name, link);
  listForCards.append(card);
}

//вызов функции отображения карточек из массива
initialCards.forEach((item) => {
  renderCards(item.name, item.link);
})



// общая функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc) // вешаю слушатель при открытом окне на закрытие по Escape
}

// функция открытия попап профиля
function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profilePopup);
}

// функция для закрытия попап по нажатию на Escape
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Закрытие попапа кликом на оверлей
popupAll.forEach((popup) => {

  popup.addEventListener('mousedown', (evt) => { //заменил click на mousedown чтоб случайно не закрывался попап при уходе с формы в момент нажатия и отпускания кнопки мыши
    // console.log(evt.target);
    // console.log(evt.currentTarget);
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  });
})

// общая функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc) //чтобы перестал срабатывать когда окна закрыты
}


// ------------------------------------слушатели----------------------------------

//слушатель открытия попап профиля по кнопке редактирования профиля
editProfileButton.addEventListener('click', () => {
  openProfilePopup();
  profileValidator.resetValidation();
}
);

//слушатель сохранения профиля
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
});

//слушатель открытия попап создания новой карточки по кнопке
newCardButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  newCardTitleInput.value = ''; //чтобы очищалось поле при открывании
  newCardUrlInput.value = ''; //чтобы очищалось поле при открывании
  newCardValidator.resetValidation();
});

//добавляю слушатель на форму добавления карточки через submit
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отменяем дефолтное поведение страницы (обновление) при нажатии на submit
  const name = newCardTitleInput.value; // в переменную name ставим значение, которое будет введено в поле имени места
  const link = newCardUrlInput.value; // в переменную link ставим значение, которое будет введено в поле ссылки на картинку

  const card = createCard(name, link)
  listForCards.prepend(card);
  closePopup(newCardPopup); // закрытие попап место
})

document.querySelectorAll('.popup__close-btn').forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopup(buttonsPopup)); // закрыли попап
});
