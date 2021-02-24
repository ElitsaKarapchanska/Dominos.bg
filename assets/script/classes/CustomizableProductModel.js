class CustomizableProduct extends Product {
  constructor(title, image, price, weight, id, category, tags, ingredients) {
    super(title, image, price, weight, id, category, tags);
    this.ingredients = ingredients; // array
  }
}
