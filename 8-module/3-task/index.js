export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

