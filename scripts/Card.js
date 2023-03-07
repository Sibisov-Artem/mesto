export default class Card {
  constructor(name, link, openPopupView) {
    this._name = name;
    this._link = link;
    this._openPopupView = openPopupView;

  }

  //создание копии template
  _getTemplate() {
    const cardElement = document.querySelector('.card-template').content.querySelector('.place__card').cloneNode(true);

    return cardElement;
  }

  //создаем и заполняем карточку
  createCard() {
    // Запишем разметку в приватное поле _element. Для доступа элементов к ней.
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector('.place__title').textContent = this._name; // название картинки (title)
    this._element.querySelector('.place__image').src = this._link; //ссылка на картинку
    this._element.querySelector('.place__image').alt = this._name; //alt описание к картинке

    //удаление картинки по клику на корзинку
    this._element.querySelector('.place__wastebasket-btn').addEventListener('click', (event) => {
      this._deleteClick(event)
    });



    //переключатель лайков
    this._element.querySelector('.place__like-btn').addEventListener('click', (event) => {
      this._likeClick(event)
    }); //переключатель лайков

    //просмотр картинки в попапе
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._openPopupView(this._name, this._link)
    });




    return this._element;




  }

  //функция удаления по клику по корзинке через target и closest для createCard
  _deleteClick(event) {
    event.target.closest('.place__card').remove();
  }

  // функция переключателя лайков на карточки для createCard
  _likeClick(event) {
    event.target.classList.toggle('place__like-btn_active');
  }

}
