const sandwichManager = (function () {
  class Sandwich extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients) {
      super(title, image, price, weight, id, "sandwich", tags, ingredients);
    }
  }

  class SandwichManager {
    constructor() {
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
  }
  return new SandwichManager();
})();
