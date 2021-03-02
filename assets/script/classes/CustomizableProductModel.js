class CustomizableProduct extends Product {
  constructor(title, image, price, weight, id, category, tags, ingredients) {
    super(title, image, price, weight, id, category, tags);
    this.ingredients = ingredients; // array
    // saving the initial ingredients so that we can reset the product after it has been
    // customized and added to basket
    this.initialIngredients = ingredients;
  }

  addIngredient(ingredient) {
    if (ingredientManager.checkIfIngredient(ingredient)) {
      this.ingredients.push(ingredient);
    }
  }

  resetProductIngredients() {
    this.ingredients = this.initialIngredients;
  }

  getIngredientsToString() {
    let stringified = this.ingredients.reduce((string, ingredient) => {
      string += ingredient.isAdditional
        ? INGREDIENT_NAMES_CONSTANTS.EXTRA + " " + ingredient.title + ', '
        : ingredient.title + ', ';
    }, "");
    return stringified.trim().slice(0, stringified.length - 1).toLowerCase();
  }
}
