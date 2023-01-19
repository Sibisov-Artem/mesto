// Нужно чтобы при нажатии на кнопку редактирования всплывало окно редактирования имени и описания о себе
// То есть нужно  чтобы при нажатии кнопки с селектором .profile__edit-btn к классу 'popup' рядом добавился класс 'popup_opened'

let popup = document.querySelector('.popup');
let page = document.querySelector('.page');
let content = page.querySelector('.content');
let profile = content.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-btn');

function popupOpen() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', popupOpen);

// Нужно чтобы при нажатии на крестик окно редактирования закрылось
// то есть чтобы при нажатии на 'popup__close-btn' у класса 'popup' удалился класс 'popup_opened'

let popupCloseButton = popup.querySelector('.popup__close-btn');

function popupClose() {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', popupClose);


// При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
// то есть значениям полей ввода селекторов .form__item_el_name и .form__item_el_description
// присвоить текст от соответсвующих селекторов .profile__name и .profile__description

let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
let popupProfileName = popup.querySelector('.form__item_el_name');
let popupProfileDescription = popup.querySelector('.form__item_el_description');

popupProfileName.value = profileName.textContent;
popupProfileDescription.value = profileDescription.textContent;

// После внесения изменений и нажатия кнопки «Сохранить» информация на странице должна обновиться, а попап автоматически закрыться
// то есть значения внесенные в поля .form__item_el_name и .form__item_el_description
// присваиваются текстом к соответсвующим селекторам .profile__name и .profile__description
// и при нажатии кнопки с селектором .form__submit-btn производится закрытие с помощью ранее созданной функции popupClose

let submitButton = popup.querySelector('.form__submit-btn');

function saveProfile() {
  profileName.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  popup.classList.remove('popup_opened');
}

submitButton.addEventListener('click', saveProfile);


