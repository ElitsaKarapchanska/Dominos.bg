const ingredientManager = (function () {
  class Ingredient {
    constructor(title, isAdditional, price, id) {
      this.title = title;
      this.isAdditional = isAdditional; // true or false;
      this.price = price; // if isAdditional = false, then price=0.00;
      this.id = id;
    }
  }

  class IngredientManager {
    constructor() {
      this.allIngredients = [];
      this.sauces = [];
      this.herbs = [];
      this.cheeses = [];
      this.meats = [];
      this.vegetables = [];
      this.misc = [];
    }

    checkIfIngredient(object) {
      return object instanceof Ingredient;
    }

    /**
     * Takes an object and fills all the arrays.
     * @param {Object} ingredientsJSON object with keys - the category names and values - an array of the ingredient objects
     */
    addAllIngredients(ingredientsJSON) {
      for (let category in ingredientsJSON) {
        for (let i = 0; i < ingredientsJSON[category].length; i++) {
          let current = ingredientsJSON.category[i];
          let ingredient = new Ingredient(
            current["title"],
            false,
            current["price"],
            current["id"]
          );
          switch (category) {
            case INGREDIENT_CATEGORY_SAUCES:
              this.sauces.push(ingredient);
              break;
            case INGREDIENT_CATEGORY_HERBS:
              this.herbs.push(ingredient);
              break;
            case INGREDIENT_CATEGORY_CHEESES:
              this.cheeses.push(ingredient);
              break;
            case INGREDIENT_CATEGORY_MEATS:
              this.meats.push(ingredient);
              break;
            case INGREDIENT_CATEGORY_VEGETABLES:
              this.vegetables.push(ingredient);
              break;
            case INGREDIENT_CATEGORY_MISC:
              this.misc.push(ingredient);
              break;
          }
          this.allIngredients.push(ingredient);
        }
      }
    }
  }
  return new IngredientManager();
})();
