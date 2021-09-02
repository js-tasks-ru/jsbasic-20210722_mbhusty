import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.makeProductsGrid();
  }

  makeProductsGrid() {
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elem.insertAdjacentHTML(
      'afterbegin',
      `<div class="products-grid__inner"></div>`
    );
    this.productInner = this.elem.querySelector('.products-grid__inner');
    this.updateProducts(this.products);
  }

  updateProducts(products) {
    products.forEach((card) => {
      let cards = new ProductCard(card).elem;
      this.productInner.append(cards);
    });
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters, filters);

    let filterProducts = this.products.filter((product) => {
      let noNuts =
        (this.filters.noNuts &&
          (product.nuts === false ||
            product.hasOwnProperty('nuts') === false)) ||
        !this.filters.noNuts;

      let vegeterianOnly =
        (this.filters.vegeterianOnly && product.vegeterian === true) ||
        !this.filters.vegeterianOnly;

      let maxSpiciness =
        (this.filters.maxSpiciness &&
          product.spiciness <= this.filters.maxSpiciness) ||
        !this.filters.maxSpiciness;

      let category =
        (this.filters.category && product.category === this.filters.category) ||
        !this.filters.category;

      return noNuts && vegeterianOnly && maxSpiciness && category;
    });

    this.productInner.innerHTML = '';
    this.updateProducts(filterProducts);
  }
}
