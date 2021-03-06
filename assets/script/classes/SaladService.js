const saladManager = (function () {
  class Salad extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients, initialIngredients) {
      super(title, image, price, weight, id, "salad", tags, ingredients, initialIngredients);
    }
  }

  class SaladManager extends CustomizableProductManager {
    constructor() {
      super();
      this.allSalads = [];
    }

    addSalad(salad) {
      if (salad instanceof Salad) this.allSalads.push(salad);
    }

    addAllSaladProducts(saladJSON) {
      if (!Array.isArray(saladJSON)) return false;
      saladJSON.forEach((element) => {
        this.addSalad(
          new Salad(
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
      return new Salad(
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
  return new SaladManager();
})();
