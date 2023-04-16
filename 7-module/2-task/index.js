import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.innerHTML = ` <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>`;

    document.body.appendChild(this.modal);
    this.modalClose = this.modal.querySelector('.modal__close');
    this.modalClose.addEventListener('click', this.close.bind(this));

  }
  setTitle(title) {
    this.modal.querySelector('.modal__title').textContent = title;
  }
  setBody(node) {
    this.modal.querySelector('.modal__body').innerHTML = '';
    this.modal.querySelector('.modal__body').appendChild(node);
  }
  close() {
    document.body.classList.remove('is-modal-open');
    this.modal.remove();
    document.removeEventListener('keydown', this.keydownHandler);
  }
  open() {
    document.body.classList.add('is-modal-open');
    this.keydownHandler = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  }
}
