const pizzaManager = (function () {
  class Pizza extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients) {
      super(title, image, price, weight, id, "pizza", tags, ingredients);
    }
  }

  class PizzaManager {
    constructor() {
      this.newPizzas = [];
      this.spicyPizzas = [];
      this.vegetariansPizzas = [];
      this.leanPizzas = [];
      this.allPizzas = [];
    }

    addPizza(pizza) {
      if (!(pizza instanceof Pizza)) return false;
      this.allPizzas.push(pizza);
      if (pizza.tags.includes("НОВО")) this.newPizzas.push(pizza);
      if (pizza.tags.includes("ПИКАНТНО")) this.spicyPizzas.push(pizza);
      if (pizza.tags.includes("ЗА ВЕГЕТАРИАНЦИ")) {
        this.vegetariansPizzas.push(pizza);
      }
      if (pizza.tags.includes("ПОСТНИ")) this.leanPizzas.push(pizza);
    }

    addAllPizzaProducts(pizzaJSON) {
      if (!Array.isArray(pizzaJSON)) return false;
      pizzaJSON.forEach((element) => {
        this.addPizza(
          new Pizza(
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
  return new PizzaManager();
})();
