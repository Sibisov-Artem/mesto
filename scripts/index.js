const page = document.querySelector('.page');
const content = page.querySelector('.content');
const profile = content.querySelector('.profile');
const popupAll = document.querySelectorAll('.popup') // использую для закрытия по оверлею

//---------------------------попап профиль------------------------------------------------------------------
const popupProfile = document.querySelector('.popup_profile'); //попап профиля
const profileName = profile.querySelector('.profile__name'); //имя профиля
const profileDescription = profile.querySelector('.profile__description'); //описание профиля
const editButton = profile.querySelector('.profile__edit-btn');  //кнопка открытия попап профиля
const formElementProfile = popupProfile.querySelector('.popup__form_profile'); //форма попап профиля
const popupInputProfileName = popupProfile.querySelector('.popup__input_el_name'); //поле имени профиля
const popupInputProfileDescription = popupProfile.querySelector('.popup__input_el_description'); //поле описания профиля
const popupProfileCloseButton = document.querySelector('.popup__close-btn_profile'); //кнопка закрытия попап профиля

//---------------------------попап добавления места------------------------------------------------------------------
const popupMesto = document.querySelector('.popup_mesto'); //попап добавления места
const mestoAddButton = profile.querySelector('.profile__add-btn'); //кнопка открытия попап добавления места
const popupMestoCloseButton = document.querySelector('.popup__close-btn_mesto'); //кнопка закрытия попап добавления места

const likeButton = document.querySelectorAll('.place__like-btn'); //кнопка лайк

const template = document.querySelector('.card-template').content.querySelector('.place__card'); // тэмплейт и его контент-карточка
const list = document.querySelector('.place__grid'); // список, внутрь которого будут вставать карточки
const formAddMesto = document.querySelector('.popup__form_mesto'); //форма попап добавления места
const popupInputMestoTitle = document.querySelector('.popup__input_el_mesto-title'); //поле имени места
const popupInputMestoUrlImage = document.querySelector('.popup__input_el_mesto-url'); //поле адреса картинки

//---------------------------попап просмотра картинок------------------------------------------------------------------
const popupView = document.querySelector('.popup_view'); //попап просмотра картинки
const popupViewCloseButton = document.querySelector('.popup__close-btn_view'); //кнопка закрытия просмотра картинки
const image = document.querySelector('.popup__image'); // картинка просмотра
const imageCaption = document.querySelector('.popup__image-caption'); // описание к картинке

// ----------------------------------функции-------------------------------------------------------

//функция удаления по клику по корзинке через target и closest для createCard
function deleteClick(event) {
  event.target.closest('.place__card').remove();
}

// функция переключателя лайков на карточки для createCard
function likeClick(event) {
  event.target.classList.toggle('place__like-btn_active');
}

// функция создания и просмотра карточки
function createCard(name, link) {
  const card = template.cloneNode(true);
  const imageCard = card.querySelector('.place__image');
  card.querySelector('.place__title').textContent = name; // название картинки (title)
  imageCard.src = link; //ссылка на картинку
  imageCard.alt = name; //alt описание к картинке
  card.querySelector('.place__wastebasket-btn').addEventListener('click', deleteClick); //удаление картинки по клику на корзинку
  card.querySelector('.place__like-btn').addEventListener('click', likeClick); //переключатель лайков
  imageCard.addEventListener('click', () => openPopupView(name, link));

  return card;
}

//  функция открытия попап просмотра картинки
function openPopupView(name, link) {
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;
  openPopup(popupView);
}

// функция отображения карточек
function renderCards(name, link) {
  const card = createCard(name, link);
  list.append(card);
}

//вызов функции отображения карточек из массива
initialCards.forEach((item) => {
  renderCards(item.name, item.link);
})

//добавляю слушатель на форму добавления карточки через submit
formAddMesto.addEventListener('submit', (evt) => {
  evt.preventDefault(); // отменяем дефолтное поведение страницы (обновление) при нажатии на submit
  const name = popupInputMestoTitle.value; // в переменную name ставим значение, которое будет введено в поле имени места
  const link = popupInputMestoUrlImage.value; // в переменную link ставим значение, которое будет введено в поле ссылки на картинку

  const card = createCard(name, link)
  closePopup(popupMesto); // закрытие попап место
  list.prepend(card);
})

// общая функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc) // вешаю слушатель при открытом окне на закрытие по Escape
}

// функция открытия попап профиля
function openPopupProfile() {
  popupInputProfileName.value = profileName.textContent;
  popupInputProfileDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}
//--------------------------------------
// функция для закрытия попап по нажатию на Escape
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
//------------------------------------
// Закрытие попапа кликом на оверлей
popupAll.forEach((popup) => {

  popup.addEventListener('mousedown', (evt) => { //заменил click на mousedown
    console.log(evt.target);
    console.log(evt.currentTarget);
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  });
})
//------------------------------------
// общая функция закрытия попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc) //чтобы перестал срабатывать когда окна закрыты
}

// функция сохранения профиля
function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputProfileName.value;
  profileDescription.textContent = popupInputProfileDescription.value;
  closePopup(popupProfile);
}

// ------------------------------------------------слушатели---------------------------------------------------------

editButton.addEventListener('click', openPopupProfile); //слушатель открытия попап профиля по кнопке редактирования профиля

popupProfileCloseButton.addEventListener('click', () => { closePopup(popupProfile) }); //слушатель закрытия попап профиля по кнопке закрытия

formElementProfile.addEventListener('submit', saveProfile); //слушатель сохранения профиля

mestoAddButton.addEventListener('click', () => {
  openPopup(popupMesto);
  popupInputMestoTitle.value = ''; //чтобы очищалось поле при открывании
  popupInputMestoUrlImage.value = ''; //чтобы очищалось поле при открывании
}); //слушатель открытия попап добавления места по кнопке добавления места

popupMestoCloseButton.addEventListener('click', () => { closePopup(popupMesto) }); //слушатель закрытия попап места по кнопке закрытия

popupViewCloseButton.addEventListener('click', () => { closePopup(popupView) }); //слушатель закрытия попап просмотра картинки по кнопке закрытия

