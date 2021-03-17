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
    let priceModifiers = parseFloat(cartItem.priceModifiers);
    if (cartItem.prod.types) {
      if (cartItem.prod.types.length === 0) {
        return cartItem.prod.price[0] + priceModifiers;
      }
      let selectedTypeIndex = cartItem.prod.types.indexOf(cartItem.prod.selectedType);
      return cartItem.prod.price[selectedTypeIndex] + priceModifiers;
    }
    if (cartItem.prod.category !== "pizza") {
      return cartItem.prod.price + priceModifiers;
    }
    switch (cartItem.prod.size) {
      case PIZZA_SIZES.MEDIUM:
        return cartItem.prod.price[0] + priceModifiers;
      case PIZZA_SIZES.BIG:
        return cartItem.prod.price[1] + priceModifiers;
      case PIZZA_SIZES.JUMBO:
        return cartItem.prod.price[2] + priceModifiers;
    }
  }
}
