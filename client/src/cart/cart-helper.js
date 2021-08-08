const cartHelper = {
  createCart() {
    if (window !== undefined && !localStorage.getItem("cart")) {
      let cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },
  loadCartFromCache() {
    if (window !== undefined && localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  },
  saveCartToCache(items) {
    if (window !== undefined && localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  },
  getCartTotal(array) {
    return array.reduce((sum, item) => (sum = sum + item.price), 0);
  },
};

export default cartHelper;
