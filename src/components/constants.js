export {
  initialCards,
  formsConfig,
  page,
  content,
  profile,
  profilePopup,
  editProfileButton,
  profileNameInput,
  profileDescriptionInput,
  newCardPopup,
  newCardButton,
  listForCards,
  newCardForm,
  newCardTitleInput,
  newCardUrlInput,

}

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
