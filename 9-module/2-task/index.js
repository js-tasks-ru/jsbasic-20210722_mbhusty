import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {

    this.carousel = new Carousel(slides);
    document
      .querySelector('[data-carousel-holder]')
      .appendChild(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]')
      .appendChild(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document
      .querySelector('[data-slider-holder]')
      .appendChild(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document
      .querySelector('[data-cart-icon-holder]')
      .appendChild(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    let json = await fetch('./products.json');
    this.products = await json.json();

    this.productGrid = new ProductsGrid(this.products);
    document.querySelector('[data-products-grid-holder]').innerHTML = ``;
    document
      .querySelector('[data-products-grid-holder]')
      .appendChild(this.productGrid.elem);


    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener('product-add', (event) => {
      let product = this.products.find((item) => {
        return event.detail === item.id;
      });
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productGrid.updateFilter({ maxSpiciness: event.detail });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productGrid.updateFilter({ category: event.detail });
    });

    document
      .getElementById('nuts-checkbox')
      .addEventListener('change', () => {
        this.productGrid.updateFilter({
          noNuts: document.getElementById('nuts-checkbox').checked,
        });
      });

    document
      .getElementById('vegeterian-checkbox')
      .addEventListener('change', () => {
        this.productGrid.updateFilter({
          vegeterianOnly: document.getElementById('vegeterian-checkbox')
            .checked,
        });
      });


  }
}
