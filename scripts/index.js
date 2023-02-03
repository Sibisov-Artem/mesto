const popupAll = document.querySelector('.popup'); //все попапы

const popupProfile = document.querySelector('.popup_profile'); //попап профиля
const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');

const profileName = profile.querySelector('.profile__name'); //имя профиля
const profileDescription = profile.querySelector('.profile__description'); //описание профиля
const editButton = profile.querySelector('.profile__edit-btn');  //кнопка открытия попап профиля

const formElementProfile = popupProfile.querySelector('.popup__form_profile'); //форма попап профиля
const popupInputProfileName = popupProfile.querySelector('.popup__form-item_el_name'); //поле имени профиля
const popupInputProfileDescription = popupProfile.querySelector('.popup__form-item_el_description'); //поле описания профиля

const popupProfileCloseButton = document.querySelector('.popup__close-btn_profile'); //кнопка закрытия попап профиля

const popupMesto = document.querySelector('.popup_mesto'); //попап добавления места

const mestoAddButton = profile.querySelector('.profile__add-btn'); //кнопка открытия попап добавления места

const popupMestoCloseButton = document.querySelector('.popup__close-btn_mesto'); //кнопка закрытия попап добавления места

const likeButton = document.querySelectorAll('.place__like-btn'); //кнопка лайк

// набор начальных карточек
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

//-------------------------------------------------------------------------
// смотрю видео и по ходу просмотра выполняю темплейт
const template = document.querySelector('.card-template').content.querySelector('.place__card'); // тэмплейт и его контент-карточка
const list = document.querySelector('.place__grid'); // список, внутрь которого будут вставать карточки

const formAddMesto = document.querySelector('.popup__form_mesto'); //форма попап добавления места
const popupInputMestoTitle = document.querySelector('.popup__form-item_el_mesto-title'); //поле имени места
const popupInputMestoUrlImage = document.querySelector('.popup__form-item_el_mesto-url'); //поле адреса картинки


/*------------------------------------------------------------------------
// функция отображения карточек через forEach

function renderCards() {
  initialCards.forEach((item) => {
    const card = template.cloneNode(true);
    card.querySelector('.place__title').textContent = item.name;
    card.querySelector('.place__image').src = item.link;
    list.append(card);
  })
}

renderCards(initialCards); //вызов функции отображения карточек
*//*-----------------------------------------------------------------------*/

/*-----------------------------------------------------------------------
/* в этом комментарии то, что было до того как избавиться от повторяющегося кода добавления карточек через массив и формы добавления
// функция отображения карточек через map и rest

function renderCards(items) {
  const cards = items.map((item) => {
    const card = template.cloneNode(true);
    card.querySelector('.place__title').textContent = item.name;
    card.querySelector('.place__image').src = item.link;
    return card;
  })
  list.append(...cards);
}

renderCards(initialCards); //вызов функции отображения карточек

//добавляю слушатель на форму добавления карточки через submit
formAddMesto.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отменяем дефолтное поведение страницы (обновление) при нажатии на submit
  const name = popupInputMestoTitle.value; // в переменную name ставим значение, которое будет введено в поле имени места
  const link = popupInputMestoUrlImage.value; // в переменную link ставим значение, которое будет введено в поле ссылки на картинку

  const card = template.cloneNode(true);
  card.querySelector('.place__title').textContent = name;
  card.querySelector('.place__image').src = link;

  list.append(card);
})
*//*-----------------------------------------------------------------------*/

/*
//функция создания и удаления карточек -------------------------------------------------------------------------
//способ функции двойного выполнения, буду переделывать на разделение функций на отдельные действия
//то есть удаление отдельно, создание отдельно

function createAndRemoveCard(item) {
  const card = template.cloneNode(true);
  card.querySelector('.place__title').textContent = item.name;
  card.querySelector('.place__image').src = item.link;
  card.querySelector('.place__wastebasket-btn').addEventListener('click', () => { //удаление карточки по кнопке корзинки
    card.remove();
  });
  return card;
}

// функция отображения карточек через map и rest
function renderCards(items) {
  const cards = items.map((item) => {
    const card = template.cloneNode(true);
    return createAndRemoveCard(item);
  })
  list.append(...cards);
}

renderCards(initialCards); //вызов функции отображения карточек

//добавляю слушатель на форму добавления карточки через submit
formAddMesto.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отменяем дефолтное поведение страницы (обновление) при нажатии на submit
  const name = popupInputMestoTitle.value; // в переменную name ставим значение, которое будет введено в поле имени места
  const link = popupInputMestoUrlImage.value; // в переменную link ставим значение, которое будет введено в поле ссылки на картинку

  const card = createAndRemoveCard({ name: name, link: link })

  list.append(card);
}) */
//------------------------------------------------------------------------------------------------------------------


//функция удаления по клику по корзинке через target и closest для createCard
function deleteClick(event) {
  event.target.closest('.place__card').remove();
}

// функция переключателя лайков на карточки
function likeClick(event) {
  event.target.classList.toggle('place__like-btn_active');
}

// функция создания карточки
function createCard(item) {
  const card = template.cloneNode(true);
  card.querySelector('.place__title').textContent = item.name; // название картинки (title)
  card.querySelector('.place__image').src = item.link; //ссылка на картинку
  card.querySelector('.place__image').alt = item.name; //alt описание к картинке
  card.querySelector('.place__wastebasket-btn').addEventListener('click', deleteClick); //удаление картинки по клику на корзинку
  card.querySelector('.place__like-btn').addEventListener('click', likeClick); //переключатель лайков
  return card;
}

// функция отображения карточек через map и rest из массива
function renderCards(items) {
  const cards = items.map((item) => {
    const card = template.cloneNode(true);
    return createCard(item);
  })
  list.append(...cards);
}

renderCards(initialCards); //вызов функции отображения карточек из массива



//добавляю слушатель на форму добавления карточки через submit
formAddMesto.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отменяем дефолтное поведение страницы (обновление) при нажатии на submit
  const name = popupInputMestoTitle.value; // в переменную name ставим значение, которое будет введено в поле имени места
  const link = popupInputMestoUrlImage.value; // в переменную link ставим значение, которое будет введено в поле ссылки на картинку

  const card = createCard({ name: name, link: link })
  closePopupMesto(); // закрытие попапа
  list.prepend(card);
})















// --------------------------------------------------------------


// функция открытия попап профиля
function openPopupProfile() {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileDescription.value = profileDescription.textContent;
  popupProfile.classList.add('popup_opened');
}

// функция закрытия попап профиля
function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

// функция сохранения профиля
function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileDescription.textContent = popupInputProfileDescription.value;
  closePopupProfile();
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

/*----------------------------------------------------------------------------------------
Это было до подключения динамического подключения, создания картинок

// переключатель лайков на карточки
likeButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like-btn_active');
  });
});
-----------------------------------------------------------------------------------------------------------------*/

//работаю над попап просмотра картинки
//сперва нужно натсроить css свойства для попап
//далее идет работа JS:
const popupView = document.querySelector('.popup_view'); //попап просмотра картинки
const popupViewCloseButton = document.querySelector('.popup__close-btn_view'); //кнопка закрытия просмотра картинки
const image = document.querySelector('.place__image');
const imageVeiw = document.querySelector('.gallery__img'); // картинка попап просмотра картинки
const ImageCaption = document.querySelector('.popup__image-caption'); // описание к картинке

// функция открытия попап добавления места
function openPopupView() {
  popupView.classList.add('popup_opened');
}

image.addEventListener('click', openPopupView); //слушатель открытия попап добавления места по кнопке добавления места
