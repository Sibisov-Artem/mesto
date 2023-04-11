export default class Card {
  constructor(data, templateSelector, openPreviewPopup, openConfirmationRemove) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._openPreviewPopup = openPreviewPopup; // для просмотра картинки
    this._openConfirmationRemove = openConfirmationRemove;  // для попапа подтверждения удаления картинки

  }

  //создание копии template
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place__card').cloneNode(true);
    return cardElement;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // функция переключателя лайков на карточки для createCard
  _likeClick() {
    this._likeButton.classList.toggle('place__like-btn_active');
  }

  _setEventListeners = () => {
    // для подтверждения удаления картинки
    this._wastebasketButton = this._element.querySelector('.place__wastebasket-btn');
    this._wastebasketButton.addEventListener('click', () => {
      this._openConfirmationRemove();
    });

    //переключатель лайков
    this._likeButton = this._element.querySelector('.place__like-btn');
    this._likeButton.addEventListener('click', () => {
      this._likeClick();
    }); //переключатель лайков

    //просмотр картинки в попапе
    this._cardImage.addEventListener('click', () => {
      this._openPreviewPopup(this._name, this._link)
    });

  }

  //создаем и заполняем карточку
  createCard() {
    // Запишем разметку в приватное поле _element. Для доступа элементов к ней.
    this._element = this._getTemplate();

    // Добавим данные

    this._element.querySelector('.place__title').textContent = this._name; // название картинки (title)

    this._cardImage = this._element.querySelector('.place__image');
    this._cardImage.src = this._link; //ссылка на картинку
    this._cardImage.alt = this._name; //alt описание к картинке

    //счетчик лайков
    this._likeCount = this._element.querySelector(".place__like-count");
    this._likeCount.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }

}
