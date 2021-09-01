import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find(
        (item) => item.product.id === product.id
      );

      if (cartItem) {
        cartItem.count++;
      } else {
        this.cartItems.push({product: product, count: 1});
      }

      this.onProductUpdate(cartItem);
    }

  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((cart) => cart.product.id === productId);

    if (cartItem) {
      cartItem.count += amount;

      if (cartItem.count === 0) {
        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let result = 0;

    for (let cartItem of this.cartItems) {
      result += cartItem.count;
    }

    return result;
  }

  getTotalPrice() {
    let price = 0;

    for (let cartItem of this.cartItems) {
      price += cartItem.product.price * cartItem.count;
    }

    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(this.createOrderContent());
    this.modal.open();
    this.modal.elem
      .querySelectorAll('.cart-counter__button')
      .forEach((button) => button.addEventListener('click', this.buttonEvents));
    this.modal.elem
      .querySelector('.cart-form')
      .addEventListener('submit', this.onSubmit.bind(this));
  }

  createOrderContent() {
    this.orderContent = createElement('<div></div>');
    this.cartItems.forEach((cart) => {
      this.orderContent.append(this.renderProduct(cart.product, cart.count));
    });
    this.orderContent.append(this.renderOrderForm());
    return this.orderContent;
  }

  buttonEvents = (event) => {
    let productId = event.target.closest('.cart-product').dataset.productId;
    const amount = event.target.closest('.cart-counter__button_plus') ? 1 : -1;
    this.updateProductCount(productId, amount);
  };

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      if (this.cartItems.length === 0) {
        this.modal.close();
        this.modal = null;
      }
      if (cartItem.count < 1) {
        let zeroItem = this.orderContent.querySelector(
          `[data-product-id="${cartItem.product.id}"]`
        );
        zeroItem.remove();
      } else {
        let productCount = document.body.querySelector(
          `[data-product-id="${cartItem.product.id}"] .cart-counter__count`
        );
        productCount.innerHTML = cartItem.count;

        let productPrice = document.body.querySelector(
          `[data-product-id="${cartItem.product.id}"] .cart-product__price`
        );
        productPrice.innerHTML = `€${(
          cartItem.count * cartItem.product.price
        ).toFixed(2)}`;

        let infoPrice = document.body.querySelector(
          `.cart-buttons__info-price`
        );
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.modal.elem
      .querySelector('.button[type="submit"]')
      .classList.add('is-loading');

    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.querySelector('.cart-form')),
    });

    if (response) {
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modal.setBody(this.createReplyToOrder());
    }
  }
  createReplyToOrder() {
    this.modal.setTitle('Success!');
    let reply = document.createElement('div');
    reply.insertAdjacentHTML(
      'beforeend',
      `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `
    );
    return reply;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

