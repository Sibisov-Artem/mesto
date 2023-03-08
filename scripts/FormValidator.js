export default class FormValidator {
  constructor(formsConfig, formElement){

    this._inputSelector = formsConfig.inputSelector;
    this._submitButtonSelector = formsConfig.submitButtonSelector;
    this._inactiveButtonClass = formsConfig.inactiveButtonClass;
    this._inputErrorClass = formsConfig.inputErrorClass;
    this._errorClass = formsConfig.errorClass;
    this._formSelector = formElement;


  }


// функция показа ошибки (красный текст и красная линия в поле)
//errorElement - это соответсвующий класс span'a определенного поля
_showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(this._inputErrorClass); // подключение класса для инпута с красной линией
  errorElement.textContent = errorMessage; //текст для спана из стандартной браузерной ошибки
  errorElement.classList.add(this._errorClass); // делаем сообщение ошибки видимым добавлением классу к инпуту
};

// функция скрытия поля с ошибкой и показа ошибки
_hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
};

// функция прохождения валидации поля
_checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    this._showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    this._hideInputError(formSelector, inputSelector);
  }
};

// функция проверки инпутов на валидность
_hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
  })
};

//функция переключения состония кнопки
_toggleButtonState = (inputList, buttonElement) => {
  if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'true');
  } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'true');
  }
}

//слушатель форм и их полей
_setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(formsConfig.inputSelector)); //список, массив инпутов форм
  const buttonElement = formSelector.querySelector(formsConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
          checkInputValidity(formSelector, inputSelector);

          toggleButtonState(inputList, buttonElement);
      });
  });
};

//функция валидации форм
enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(this._formSelector));
  formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', function (evt) {
          evt.preventDefault();
      });
          this._setEventListeners(formSelector);
      });
};


// enableValidation();

//функция отключения кнопки сабмита в соответсвующем попапе
_disabledSubmitButton(popup) {
  const buttonElement = popup.querySelector(this._submitButtonSelector);
  buttonElement.classList.add(this._inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');
}


}
