import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._previewImage = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(name, link) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._imageCaption.textContent = name;

    super.open();
  }

}
