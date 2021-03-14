const sandwichManager = (function () {
  class Sandwich extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients, initialIngredients) {
      super(title, image, price, weight, id, "sandwich", tags, ingredients, initialIngredients);
    }
  }

  class SandwichManager extends CustomizableProductManager {
    constructor() {
      super();
      this.allSandwiches = [];
    }

    addSandwich(sandwich) {
      if (sandwich instanceof Sandwich) this.allSandwiches.push(sandwich);
    }

    addAllSandwichProducts(sandwichJSON) {
      if (!Array.isArray(sandwichJSON)) return false;
      sandwichJSON.forEach((element) => {
        this.addSandwich(
          new Sandwich(
            element["title"],
            element["image"],
            element["price"],
            element["weight"],
            element["id"],
            element["tags"],
            element["ingredients"].map((ingredient) =>
              ingredientManager.getIngredientCopy(
                ingredient["title"],
                ingredient["isAdditional"]
              )
            )
          )
        );
      });
    }

    getProductCopy(product) {
      return new Sandwich(
        product.title,
        product.image,
        product.price,
        product.weight,
        product.id,
        product.tags,
        product.ingredients.map((ingredient) =>
          ingredientManager.getIngredientCopy(
            ingredient["title"],
            ingredient["isAdditional"]
          )
        ),
        product.initialIngredients.map((ingredient) =>
          ingredientManager.getIngredientCopy(
            ingredient["title"],
            ingredient["isAdditional"]
          )
        )
      );
    }
  }
  return new SandwichManager();
})();
