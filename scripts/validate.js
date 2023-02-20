// объект классов для приема к функции enableValidation
const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}
// функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorText = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorText.textContent = errorMessage;
  errorText.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorText = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formsConfig.inputErrorClass);
  errorText.classList.remove('form__input-error_active');
  errorText.textContent = '';
};
