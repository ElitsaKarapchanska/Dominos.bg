// super class for all products(pizzas,chicken,desserts,drinks,pasta,salads,sandwiches,sauces,starters);
class Product {
  constructor(title, image, price, weight, id, category, tags) {
    this.title = title;
    this.image = image;
    this.price = price;
    this.weight = weight;
    this.id = id;
    this.category = category;
    this.tags = tags; // array
  }

  static getFinalPrice(cartItem) {
    if (cartItem.prod.category !== 'pizza') {
      return cartItem.prod.price + cartItem.priceModifiers;
    }
    switch (cartItem.prod.size) {
      case PIZZA_SIZES.MEDIUM:
        return cartItem.prod.price[0] + cartItem.priceModifiers;
      case PIZZA_SIZES.BIG:
        return cartItem.prod.price[1] + cartItem.priceModifiers;
      case PIZZA_SIZES.JUMBO:
        return cartItem.prod.price[2] + cartItem.priceModifiers;
    }
  }
}
