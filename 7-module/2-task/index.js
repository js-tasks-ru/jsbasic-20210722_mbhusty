import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();

    this.elem.querySelector(".modal__close").addEventListener("click", this.close);
    document.addEventListener("keydown", this.closeKey);
  }

  render() {
    this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
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
      </div>
    </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  }

  setTitle(modalTitle) {
    this.elem.querySelector(".modal__title").innerHTML = modalTitle;
  }

  setBody(modalBody) {
    this.elem.querySelector(".modal__body").innerHTML = "";
    this.elem.querySelector(".modal__body").append(modalBody);
  }

  close = () => {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
  }
  closeKey = (event) => {
    if (event.key === "Escape") {
      this.elem.remove();
      document.body.classList.remove("is-modal-open");
    }
  }
}
