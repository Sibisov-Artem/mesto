class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  // _request(url, options) {       //если останется время - перереработать с применением этого
  //   return fetch(url, options).then(this._checkResponse)
  // } а также пройтись по остальным пунктам "можно лучше"

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  // метод получения информации о пользователе с сервера
  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  // запрос карточек
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  editUser(inputData) {  //методом PATCH
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.info
      })
    })
      .then(this._checkResponse)
  }

  addNewCard(inputData) {    //методом POST
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._checkResponse)
  }

  changeAvatar(inputData) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: inputData.avatar, //avatarUrl
      }),
    })
      .then(this._checkResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'a15016d5-ae9c-4339-845d-3268b7fcaab2', //мой токен
    'Content-Type': 'application/json'
  }
});
