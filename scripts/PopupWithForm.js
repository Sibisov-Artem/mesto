import Popup from "./Popup.js";

//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  //Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  //Перезаписываем родительский метод setEventListeners
  //Он должен не только добавлять обработчик клика иконке закрытия,
  // но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();

  }
  /*
  profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profilePopup);
  });

  newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault(); // отменяем дефолтное поведение страницы (обновление) при нажатии на submit
    const name = newCardTitleInput.value; // в переменную name ставим значение, которое будет введено в поле имени места
    const link = newCardUrlInput.value; // в переменную link ставим значение, которое будет введено в поле ссылки на картинку

    const card = createCard(name, link)
    listForCards.prepend(card);
    newCardValidator.resetValidation(); //чтоб кнопка задезейблилась и не успелось понаставиться картинок
    closePopup(newCardPopup); // закрытие попап место
  })*/


  //Перезаписываем родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();

  }


}

/*


*/
