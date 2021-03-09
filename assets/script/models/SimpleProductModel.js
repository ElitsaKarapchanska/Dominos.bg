class SimpleProduct extends Product {
  constructor(title, image, price, weight, id, category, tags, description) {
    super(title, image, price, weight, id, category, tags);
    this.description = description;
  }
}
