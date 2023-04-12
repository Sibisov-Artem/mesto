import Popup from "./Popup.js";

export default class PopupConfirmationRemove extends Popup {
  constructor(popupSelector, handleSubmitRemove) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmitRemove = handleSubmitRemove;

  }

  open(element, cardId) {
    super.open();
    this._element = element;
    this._cardId = cardId
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitRemove(this._element, this._cardId)
      this.close();

    })
  }

}
