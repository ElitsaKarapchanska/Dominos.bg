const saladManager = (function () {
  class Salad extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients) {
      super(title, image, price, weight, id, "salad", tags, ingredients);
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
            element["ingredients"]
          )
        );
      });
    }
  }
  return new SaladManager();
})();
