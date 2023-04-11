class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;

  }

  // метод получения информации о пользователе с сервера
  getUser() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }


  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }


}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63', //моя группа, откуда всё будет браться после / ()
  headers: {
    authorization: 'a15016d5-ae9c-4339-845d-3268b7fcaab2', //мой токен
    'Content-Type': 'application/json'
  }
});
