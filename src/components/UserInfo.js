export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector, userId) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
    this._userId = userId;

  }

  //метод, который возвращает объект с данными пользователя.
  // собирает информацию из профиля и подставляет данные пользователя в форму при открытии.
  getUserInfo() {
    const formData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
    return formData;

  }

  //метод, который принимает новые данные пользователя из формы и добавляет их на страницу в профиль.
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
    this._userId = data._id;

  }

}
