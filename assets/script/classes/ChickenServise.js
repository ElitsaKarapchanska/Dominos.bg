const chickenManager = (function () {
  class Chicken extends SimpleProduct {
    constructor(title, image, price, weight, id, tags, description) {
      super(title, image, price, weight, id, "chicken", tags, description);
    }
  }

  class ChickenManager {
    constructor() {
      this.allChicken = [];
    }

    addChicken(chicken) {
      if (chicken instanceof Chicken) this.allChicken.push(chicken);
    }

    addAllChickenProducts(chickenJSON) {
      if (!Array.isArray(chickenJSON)) return false;
      chickenJSON.forEach((element) => {
        this.addChicken(
          new Chicken(
            element["title"],
            element["image"],
            element["price"],
            element["weight"],
            element["id"],
            element["tags"],
            element["description"]
          )
        );
      });
    }
  }
  return new ChickenManager();
})();
