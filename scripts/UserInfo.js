export default class UserInfo {
  constructor(nameProfileSelector, InfoProfileSelector) {
    this._nameProfileSelector = document.querySelector(nameProfileSelector);
    this._infoProfileSelector = document.querySelector(InfoProfileSelector);



  }

  //метод, который возвращает объект с данными пользователя.
  // подставляет данные пользователя в форму при открытии.
  getUserInfo() {
    const formData = {
      name: this._nameProfileSelector.textContent,
      info: this._infoProfileSelector.textContent
    }
    console.log('getUserInfo in UserInfo correct')
    return formData;

  }

  //метод, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(profileNameInputSelector, profileDescriptionInputSelector) {
    console.log('inputData in UserInfo not yet cor');
    const profileNameInput = document.querySelector(profileNameInputSelector);
    const profileDescriptionInput = document.querySelector(profileDescriptionInputSelector);
    this._nameProfileSelector.textContent = profileNameInput.value;
    this._infoProfileSelector.textContent = profileDescriptionInput.value;
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
