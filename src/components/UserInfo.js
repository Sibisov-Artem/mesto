export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);

  }

  //метод, который возвращает объект с данными пользователя.
  // подставляет данные пользователя в форму при открытии.
  getUserInfo() {
    const formData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
    return formData;

  }

  //метод, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.info;
  }

}
