import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render(categories);
    this.elem.addEventListener("click", this.onclick);
    this.elem.querySelector("nav.ribbon__inner").addEventListener("scroll", this.onscroll);
  }
  render(cat) {
    this.elem = createElement("<div class='ribbon'> </div>");
    this.elem.innerHTML = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`;
    for (let i of cat) {
      this.elem.querySelector("nav.ribbon__inner").innerHTML += 
      `<a 
        href="#" 
        class="ribbon__item" 
        data-id=${i.id}
      >
        ${i.name}
      </a>`;
    }
  }

  onclick(event) {
    if (event.target.className.includes("ribbon__arrow_right")) {
      event.currentTarget.querySelector(".ribbon__inner").scrollBy(350, 0);
    } else if (event.target.className.includes("ribbon__arrow_left")) {
      event.currentTarget.querySelector(".ribbon__inner").scrollBy(-350, 0);
    } else if (event.target.tagName === "A") {
      event.preventDefault();

      if (this.color) {
        this.color.classList.remove("ribbon__item_active");
      }

      this.color = event.target;
      this.color.classList.add("ribbon__item_active");

      event.target.closest(".ribbon").dispatchEvent(new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      }));
    }
  }

  onscroll(event) {
    if (event.target.scrollLeft === 0) {
      event.target.previousElementSibling.classList.remove("ribbon__arrow_visible");
      event.target.nextElementSibling.classList.add("ribbon__arrow_visible");
    } else if (event.target.scrollWidth - event.target.scrollLeft - event.target.clientWidth === 0) {
      event.target.previousElementSibling.classList.add("ribbon__arrow_visible");
      event.target.nextElementSibling.classList.remove("ribbon__arrow_visible");
    } else {
      event.target.previousElementSibling.classList.add("ribbon__arrow_visible");
      event.target.nextElementSibling.classList.add("ribbon__arrow_visible");
    }
  }
}
