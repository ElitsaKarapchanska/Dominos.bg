const sandwichManager = (function () {
  class Sandwich extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients) {
      super(title, image, price, weight, id, "sandwich", tags, ingredients);
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
            element["ingredients"]
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
        product.ingredients
      );
    }
  }
  return new SandwichManager();
})();
