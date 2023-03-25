export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popup.querySelector('.popup__close-btn');

  }

  //публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  //приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Закрытие попапа кликом на оверлей
  _closeOverlay(evt) {

    if (evt.target === evt.currentTarget) {
      this.close()
    }
  }

  //публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    //слушатель клика иконки закрытия попапа.

    this._popupCloseButton.addEventListener('click', () => this.close()); // закрыли попап по кнопке закрытия
    this._popup.addEventListener('mousedown', this._closeOverlay.bind(this)); // закрыли попап через оверлей
  }

}


