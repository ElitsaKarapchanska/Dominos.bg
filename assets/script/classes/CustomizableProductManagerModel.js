class CustomizableProductManager {
  constructor() {}

  addIngredientToProduct(product, ingredient) {
    if (!(product instanceof CustomizableProduct)) return false;
    product.addIngredient(ingredient);
  }
}
