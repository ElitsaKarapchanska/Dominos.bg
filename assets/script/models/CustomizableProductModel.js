class CustomizableProduct extends Product {
  constructor(title, image, price, weight, id, category, tags, ingredients, initialIngredients) {
    super(title, image, price, weight, id, category, tags);
    this.ingredients = ingredients; // array
    // saving the initial ingredients so that we can reset the product after it has been
    // customized and added to basket
    if (initialIngredients) {
      this.initialIngredients = initialIngredients;
    } else {
      let ingredientsCopy = JSON.parse(JSON.stringify(ingredients));
      this.initialIngredients = ingredientsCopy;
    }
    this.stringifiedIngredients = this.getIngredientsToString();
  }

  getIndexInCurrentIngredients(ingredient) {
    return this.ingredients.findIndex((el) => el.id === ingredient.id);
  }

  addIngredient(ingredient) {
    if (this.getIndexInCurrentIngredients(ingredient) < 0) {
      this.ingredients.push(ingredient);
    }
    return (this.stringifiedIngredients = this.getIngredientsToString());
  }

  removeIngredient(ingredient) {
    let index = this.getIndexInCurrentIngredients(ingredient);
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
    return (this.stringifiedIngredients = this.getIngredientsToString());
  }

  changeAdditionalIngredient(ingredient, isAdditional) {
    let index = this.getIndexInCurrentIngredients(ingredient);
    if (index >= 0) {
      this.ingredients[index].isAdditional = isAdditional;
    }
    return (this.stringifiedIngredients = this.getIngredientsToString());
  }

  resetProductIngredients() {
    let ingredientsCopy = JSON.parse(JSON.stringify(this.initialIngredients));
    this.ingredients = ingredientsCopy;
    this.stringifiedIngredients = this.getIngredientsToString();
  }

  getIngredientsToString() {
    let stringified = this.ingredients.reduce((string, ingredient) => {
      string += ingredient.title + ", ";
      return (string += ingredient.isAdditional
        ? INGREDIENT_NAMES_CONSTANTS.EXTRA + " " + ingredient.title + ", "
        : "");
    }, "");
    return stringified
      .trim()
      .slice(0, stringified.length - 2)
      .toLowerCase();
  }
}
