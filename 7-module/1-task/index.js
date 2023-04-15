import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  #categories = '';

  constructor(categories) {
    this.#categories = categories;
    this.elem = this.#render();
  }

  #template() {
    const categoriesHtml = this.#categories.map(category => `
    <a href="#" class="ribbon__item ribbon__item_active" data-id="${category.id}">${category.name}</a>`).join('');
    return `<div class="ribbon">
                    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
                        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                    </button>
                    <nav class="ribbon__inner">${categoriesHtml}</nav>
                    <button class="ribbon__arrow ribbon__arrow_right">
                        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
                    </button>
                </div>`;
  }
  #initRibbonRight = () => {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(350, 0);
    this.#checkBorders();
  }

  #checkBorders() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollLeft < 1) {
      arrowLeft.classList.remove("ribbon__arrow_visible");
    } else {
      arrowLeft.classList.add("ribbon__arrow_visible");
    }
    if (scrollRight < 1) {
      arrowRight.classList.remove("ribbon__arrow_visible");
    } else {
      arrowRight.classList.add("ribbon__arrow_visible");
    }
  }

  #initRibbonLeft = () => {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(-350, 0);
    this.#checkBorders();
  }
  #setActiveItem = (event) => {
    event.preventDefault();
    const target = event.target.closest('.ribbon__item');
    if (target) {
      const activeItem = this.elem.querySelector('.ribbon__item_active');
      if (activeItem) {
        activeItem.classList.remove('ribbon__item_active');
      }
      target.classList.add('ribbon__item_active');
      const customEvent = new CustomEvent('ribbon-select', {
        detail: target.dataset.id,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    }
  }

  #render() {
    const elem = createElement(this.#template());
    elem.querySelector('.ribbon__arrow_right').addEventListener('click', this.#initRibbonRight);
    elem.querySelector('.ribbon__arrow_left').addEventListener('click', this.#initRibbonLeft);
    elem.addEventListener('click', this.#setActiveItem);
    return elem;
  }
}
