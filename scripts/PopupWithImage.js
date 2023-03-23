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

/*Создайте класс PopupWithImage, который наследует от Popup.
Этот класс должен перезаписывать родительский метод open.
В методе open класса PopupWithImage нужно вставлять в попап картинку
 с src изображения и подписью к картинке.*/
