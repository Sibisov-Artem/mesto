// export default class FormValidator {
//   constructor(formSelector, formElement){

//   }




// // объект классов для приема к функции enableValidation
// const formsConfig = {
//   formSelector: '.popup__form', // форма
//   inputSelector: '.popup__input', //поле
//   submitButtonSelector: '.popup__submit-btn', //кнопка сохранить/создать
//   inactiveButtonClass: 'popup__submit-btn_disabled', // неактивная кнопка
//   inputErrorClass: 'popup__input_type_error', // input выделение поля красной линией, показывая что есть ошибка валидации
//   errorClass: 'popup__input-error_active' // делаем текст ошибки в span под input'ом видимым за счет opacity:1
// }

// // функция показа ошибки (красный текст и красная линия в поле)
// //errorElement - это соответсвующий класс span'a определенного поля
// _showInputError = (formSelector, inputSelector, errorMessage) => {
//   const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
//   inputSelector.classList.add(formsConfig.inputErrorClass); // подключение класса для инпута с красной линией
//   errorElement.textContent = errorMessage; //текст для спана из стандартной браузерной ошибки
//   errorElement.classList.add(formsConfig.errorClass); // делаем сообщение ошибки видимым добавлением классу к инпуту
// };

// // функция скрытия поля с ошибкой и показа ошибки
// _hideInputError = (formSelector, inputSelector) => {
//   const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
//   inputSelector.classList.remove(formsConfig.inputErrorClass);
//   errorElement.classList.remove(formsConfig.errorClass);
//   errorElement.textContent = '';
// };

// // функция прохождения валидации поля
// _checkInputValidity = (formSelector, inputSelector) => {
//   if (!inputSelector.validity.valid) {
//       showInputError(formSelector, inputSelector, inputSelector.validationMessage);
//   } else {
//       hideInputError(formSelector, inputSelector);
//   }
// };

// // функция проверки инпутов на валидность
// _hasInvalidInput = (inputList) => {
//   return inputList.some((inputSelector) => {
//       return !inputSelector.validity.valid;
//   })
// };

// //функция переключения состония кнопки
// _toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(formsConfig.inactiveButtonClass);
//       buttonElement.setAttribute('disabled', 'true');
//   } else {
//       buttonElement.classList.remove(formsConfig.inactiveButtonClass);
//       buttonElement.removeAttribute('disabled', 'true');
//   }
// }

// //слушатель форм и их полей
// _setEventListeners = (formSelector) => {
//   const inputList = Array.from(formSelector.querySelectorAll(formsConfig.inputSelector)); //список, массив инпутов форм
//   const buttonElement = formSelector.querySelector(formsConfig.submitButtonSelector);

//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((inputSelector) => {
//       inputSelector.addEventListener('input', function () {
//           checkInputValidity(formSelector, inputSelector);

//           toggleButtonState(inputList, buttonElement);
//       });
//   });
// };

// //функция валидации форм
// enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));
//   formList.forEach((formSelector) => {
//       formSelector.addEventListener('submit', function (evt) {
//           evt.preventDefault();
//       });
//           setEventListeners(formSelector);
//       });
// };


// enableValidation();

// //функция отключения кнопки сабмита в соответсвующем попапе
// _disabledSubmitButton(popup) {
//   const buttonElement = popup.querySelector(formsConfig.submitButtonSelector);
//   buttonElement.classList.add(formsConfig.inactiveButtonClass);
//   buttonElement.setAttribute('disabled', 'true');
// }








// }
