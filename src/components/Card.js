export default class Card {
  constructor(data, templateSelector, openPreviewPopup, userId, openConfirmationRemove) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id; //id разместивего карточку, владелец карточки
    this._cardId = data._id; //id карточки
    this._templateSelector = templateSelector;
    this._openPreviewPopup = openPreviewPopup; // для просмотра картинки
    this._openConfirmationRemove = openConfirmationRemove;  // для попапа подтверждения удаления картинки
    this._userId = userId; //_id пользователя
    this._element = this._getTemplate();
    this._wastebasketButton = this._element.querySelector('.place__wastebasket-btn');
  }

  //создание копии template
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place__card').cloneNode(true);
    return cardElement;
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._element.remove();
  }

  // функция переключателя лайков на карточки для createCard
  _likeClick() {
    this._likeButton.classList.toggle('place__like-btn_active');
  }

  _checkWastebasketButton = () => {
    if (this._userId !== this._ownerId) {
      this._wastebasketButton.remove()
    }
    //  console.log(this._userId);
    //  console.log(this._ownerId);

  }

  _setEventListeners = () => {
    // для подтверждения удаления картинки
    // this._wastebasketButton = this._element.querySelector('.place__wastebasket-btn');
    this._wastebasketButton.addEventListener('click', () => {
      this._openConfirmationRemove(this._cardId, this);
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

    this._element.querySelector('.place__title').textContent = this._name; // название картинки (title)

    this._cardImage = this._element.querySelector('.place__image');
    this._cardImage.src = this._link; //ссылка на картинку
    this._cardImage.alt = this._name; //alt описание к картинке

    //счетчик лайков
    this._likeCount = this._element.querySelector(".place__like-count");
    this._likeCount.textContent = this._likes.length;
    this._checkWastebasketButton();

    this._setEventListeners();

    return this._element;
  }

}
