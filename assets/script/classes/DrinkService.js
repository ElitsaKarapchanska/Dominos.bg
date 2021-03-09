const drinkManager = (function () {
  class Drink {
    constructor(title, image, price, id, tags, types) {
      this.title = title;
      this.price = price;
      this.image = image;
      this.id = id;
      this.tags = tags; // array;
      this.types = types;
      this.category = "drink";
      if (types.length > 0) {
        this.selectedType = types[0];
      }
    }
  }

  class DrinkManager {
    constructor() {
      this.allDrinks = [];
    }

    addDrink(drink) {
      if (drink instanceof Drink) this.allDrinks.push(drink);
    }

    addAllDrinkProducts(drinkJSON) {
      if (!Array.isArray(drinkJSON)) return false;
      drinkJSON.forEach((element) => {
        this.addDrink(
          new Drink(
            element["title"],
            element["image"],
            element["price"],
            element["id"],
            element["tags"],
            element["types"]
          )
        );
      });
    }
  }
  return new DrinkManager();
})();
