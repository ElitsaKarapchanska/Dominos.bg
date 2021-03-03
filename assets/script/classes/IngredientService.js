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

    searchForIngredient(title) {
      return this.allIngredients.find(
        (ingredient) => ingredient.title === title
      );
    }

    /**
     * Takes an object and fills all the arrays.
     * @param {Object} ingredientsJSON object with keys - the category names and values - an array of the ingredient objects
     */
    addAllIngredients(ingredientsJSON) {
      for (let category in ingredientsJSON) {
        for (let i = 0; i < ingredientsJSON[category].length; i++) {
          let current = ingredientsJSON[category][i];
          let ingredient = new Ingredient(
            current["title"],
            false,
            current["price"],
            current["id"]
          );
          switch (category) {
            case "SAUCES":
              this.sauces.push(ingredient);
              break;
            case "HERBS":
              this.herbs.push(ingredient);
              break;
            case "CHEESES":
              this.cheeses.push(ingredient);
              break;
            case "MEATS":
              this.meats.push(ingredient);
              break;
            case "VEGETABLES":
              this.vegetables.push(ingredient);
              break;
            case "MISC":
              this.misc.push(ingredient);
              break;
          }
          this.allIngredients.push(ingredient);
        }
      }
    }

    getIngredientCopy(title, isAdditional) {
      return { ...this.searchForIngredient(title), isAdditional: isAdditional };
    }
  }
  return new IngredientManager();
})();
