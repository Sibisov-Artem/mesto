export default class Card {
  constructor(data, templateSelector, openPreviewPopup, userId, openConfirmationRemove, addLike, deleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;  // лайки с сервера для получения длины массива лайков - колва
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._ownerId = data.owner._id; //id разместившего карточку, владелец картинки
    this._cardId = data._id; //id карточки
    this._templateSelector = templateSelector;
    this._openPreviewPopup = openPreviewPopup; // для просмотра картинки
    this._openConfirmationRemove = openConfirmationRemove;  // для попапа подтверждения удаления карточки
    this._userId = userId; //_id пользователя
    this._element = this._getTemplate();  //карточка
    this._wastebasketButton = this._element.querySelector('.place__wastebasket-btn');
    this._likeButton = this._element.querySelector('.place__like-btn');
  }

  //создание копии template
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place__card').cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._element.remove();
  }

  countLikes(data) {
    this._likes = data.likes;
    this._likeCount.textContent = this._likes.length;
  }

  _checkWastebasketButton = () => {
    if (this._userId !== this._ownerId) {
      this._wastebasketButton.remove()
    }
  }

  _checkLikeUser() {
    if (this._likes.some((like) => like._id === this._userId)) {
      return true
    } else {
      false
    }
  }

  addLike() {
    this._likeButton.classList.add('place__like-btn_active');
  }

  deleteLike() {
    this._likeButton.classList.remove('place__like-btn_active');
  }

  _setEventListeners = () => {
    // для подтверждения удаления картинки
    // this._wastebasketButton = this._element.querySelector('.place__wastebasket-btn');
    this._wastebasketButton.addEventListener('click', () => {
      this._openConfirmationRemove(this._cardId, this);
    });

    //переключатель лайков

    this._likeButton.addEventListener('click', () => {
      if (this._checkLikeUser()) {
        this._deleteLike(this._cardId);
      } else {
        this._addLike(this._cardId);
      }
    });

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
    this._likeCount.textContent = this._likes.length; //кол-во лайков ставится из данных с сервера- по длине массива лайков
    if (this._checkLikeUser()) {
      this._likeButton.classList.add('place__like-btn_active');
    }
    this._checkWastebasketButton();

    this._setEventListeners();

    return this._element;
  }

}
