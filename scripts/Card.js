export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    // this._openPreviewPopup = openPreviewPopup;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  }

  //создание копии template
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.place__card').cloneNode(true);
    return cardElement;
  }

  //функция удаления по клику по корзинке через target и closest для createCard
  _deleteClick() {
    this._element.remove();
    this._element = null;
  }

  // функция переключателя лайков на карточки для createCard
  _likeClick() {
    this._likeButton.classList.toggle('place__like-btn_active');
  }

  _setEventListeners = () => {
    //удаление картинки по клику на корзинку
    this._element.querySelector('.place__wastebasket-btn').addEventListener('click', () => {
      this._deleteClick()
    });

    //переключатель лайков
    this._likeButton = this._element.querySelector('.place__like-btn');
    this._likeButton.addEventListener('click', () => {
      this._likeClick()
    }); //переключатель лайков

    //просмотр картинки в попапе
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
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

    this._setEventListeners();

    return this._element;
  }

}
