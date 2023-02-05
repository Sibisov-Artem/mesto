const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');

//---------------------------попап профиль------------------------------------------------------------------
const popupProfile = document.querySelector('.popup_profile'); //попап профиля
const profileName = profile.querySelector('.profile__name'); //имя профиля
const profileDescription = profile.querySelector('.profile__description'); //описание профиля
const editButton = profile.querySelector('.profile__edit-btn');  //кнопка открытия попап профиля
const formElementProfile = popupProfile.querySelector('.popup__form_profile'); //форма попап профиля
const popupInputProfileName = popupProfile.querySelector('.popup__form-item_el_name'); //поле имени профиля
const popupInputProfileDescription = popupProfile.querySelector('.popup__form-item_el_description'); //поле описания профиля
const popupProfileCloseButton = document.querySelector('.popup__close-btn_profile'); //кнопка закрытия попап профиля

//---------------------------попап добавления места------------------------------------------------------------------
const popupMesto = document.querySelector('.popup_mesto'); //попап добавления места
const mestoAddButton = profile.querySelector('.profile__add-btn'); //кнопка открытия попап добавления места
const popupMestoCloseButton = document.querySelector('.popup__close-btn_mesto'); //кнопка закрытия попап добавления места

const likeButton = document.querySelectorAll('.place__like-btn'); //кнопка лайк

const template = document.querySelector('.card-template').content.querySelector('.place__card'); // тэмплейт и его контент-карточка
const list = document.querySelector('.place__grid'); // список, внутрь которого будут вставать карточки
const formAddMesto = document.querySelector('.popup__form_mesto'); //форма попап добавления места
const popupInputMestoTitle = document.querySelector('.popup__form-item_el_mesto-title'); //поле имени места
const popupInputMestoUrlImage = document.querySelector('.popup__form-item_el_mesto-url'); //поле адреса картинки

//---------------------------попап просмотра картинок------------------------------------------------------------------
const popupView = document.querySelector('.popup_view'); //попап просмотра картинки
const popupViewCloseButton = document.querySelector('.popup__close-btn_view'); //кнопка закрытия просмотра картинки
const popupImage = document.querySelector('.popup__image'); // картинка просмотра
const imageCaption = document.querySelector('.popup__image-caption'); // описание к картинке

// ----------------------------------функции-------------------------------------------------------

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
  closePopupMesto(); // закрытие попап место
  list.prepend(card);
})


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

// функция закрытия попап просмотра картинки
function closePopupView() {
  popupView.classList.remove('popup_opened');
}

//  открытие попап просмотра картинки
document.querySelectorAll('.place__image').forEach((item) => {
  item.addEventListener('click', (evt) => {
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    imageCaption.textContent = evt.target.alt;
    popupView.classList.add('popup_opened');
  });
});

// ------------------------------------------------слушатели---------------------------------------------------------

editButton.addEventListener('click', openPopupProfile); //слушатель открытия попап профиля по кнопке редактирования профиля

popupProfileCloseButton.addEventListener('click', closePopupProfile); //слушатель закрытия попап профиля по кнопке закрытия

formElementProfile.addEventListener('submit', saveProfile); //слушатель сохранения профиля

mestoAddButton.addEventListener('click', openPopupMesto); //слушатель открытия попап добавления места по кнопке добавления места

popupMestoCloseButton.addEventListener('click', closePopupMesto); //слушатель закрытия попап профиля по кнопке закрытия

popupViewCloseButton.addEventListener('click', closePopupView); //слушатель закрытия попап просмотра картинки по кнопке закрытия
