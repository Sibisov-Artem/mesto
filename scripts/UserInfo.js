export default class UserInfo {
  constructor(nameProfileSelector, InfoProfileSelector) {
    this._nameProfileSelector = document.querySelector(nameProfileSelector);
    this._InfoProfileSelector = document.querySelector(InfoProfileSelector);
  }

  //метод, который возвращает объект с данными пользователя.
  // подставляет данные пользователя в форму при открытии.
  getUserInfo() {
    const formData = {
      name: this._nameProfileSelector.textContent,
      info: this._InfoProfileSelector.textContent
    }
    return formData;

  }

  //метод, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(inputData) {
    this._nameProfileSelector.textContent = inputData.name;
    this._InfoProfileSelector.textContent = inputData.info;
  }

}
/*
profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
});
*/
