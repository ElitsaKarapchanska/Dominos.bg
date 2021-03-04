const pizzaManager = (function () {
  class Pizza extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients) {
      super(title, image, price, weight, id, "pizza", tags, ingredients);
    }
  }

  class PizzaManager extends CustomizableProductManager {
    constructor() {
      super();
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
      return new Pizza(
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
  return new PizzaManager();
})();
