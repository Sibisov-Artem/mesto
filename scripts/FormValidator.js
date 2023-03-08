export default class FormValidator {
  constructor(formsConfig, formElement){

    this._inputSelector = formsConfig.inputSelector;
    this._submitButtonSelector = formsConfig.submitButtonSelector;
    this._inactiveButtonClass = formsConfig.inactiveButtonClass;
    this._inputErrorClass = formsConfig.inputErrorClass;
    this._errorClass = formsConfig.errorClass;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

  }


// функция показа ошибки (красный текст и красная линия в поле)
//errorElement - это соответсвующий класс span'a определенного поля
_showInputError = (input, errorMessage) => {
  const errorElement = this._formElement.querySelector(`.${input.id}-error`);
  input.classList.add(this._inputErrorClass); // подключение класса для инпута с красной линией
  errorElement.textContent = errorMessage; //текст для спана из стандартной браузерной ошибки
  errorElement.classList.add(this._errorClass); // делаем сообщение ошибки видимым добавлением классу к инпуту
};


// функция скрытия поля с ошибкой и показа ошибки
_hideInputError = (input) => {
  const errorElement = this._formElement.querySelector(`.${input.id}-error`);
  input.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};


// функция прохождения валидации поля
_checkInputValidity = (input) => {
  if (!input.validity.valid) {
    this._showInputError(input, input.validationMessage);
  } else {
    this._hideInputError(input);
  }
};


// функция проверки инпутов на валидность
_hasInvalidInput = () => {
  return this._inputList.some((input) => {
      return !input.validity.valid;
  })
};


//функция переключения состония кнопки
_toggleButtonState = () => {
  if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'true');
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', 'true');
  }
}


//функция валидации форм
enableValidation = () => {
  this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
});
this._setEventListeners();
this._disabledSubmitButton();
};


//функция отключения кнопки сабмита при открытии попапа
_disabledSubmitButton() {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute('disabled', 'true');
}


//слушатель полей форм
_setEventListeners = () => {

  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);

          this._toggleButtonState();
      });
  });
};


}
