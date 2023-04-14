export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  //Содержит публичный метод renderItems, который отвечает за отрисовку всех элементов.
  // Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  renderItems(items) {
    this._items = items;
    this._items.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

  //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  //У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }

}





