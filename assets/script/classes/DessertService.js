const dessertManager = (function () {
  class Dessert extends SimpleProduct {
    constructor(title, image, price, weight, id, tags, description) {
      super(title, image, price, weight, id, "dessert", tags, description);
    }
  }

  class DessertManager {
    constructor() {
      this.desserts = [];
      this.icecreams = [];
      this.allDesserts = [];
    }

    // for now all of dominos icecreams have names that start with 'NIRVANA'
    // but it's in a method so it can be changed later
    checkIfIcecream(dessert) {
      if (dessert.title.indexOf("NIRVANA") === 0) return true;
      return false;
    }

    addAnyDesssert(dessert) {
      if (dessert instanceof Dessert) this.allDesserts.push(dessert);
    }

    addDessertOnly(dessert) {
      if (dessert instanceof Dessert && !this.checkIfIcecream(dessert)) {
        this.desserts.push(dessert);
      }
    }

    addIcecream(dessert) {
      if (dessert instanceof Dessert && this.checkIfIcecream(dessert)) {
        this.icecreams.push(dessert);
      }
    }

    addAllDessertProducts(dessertJSON) {
      if (!Array.isArray(dessertJSON)) return false;
      dessertJSON.forEach((element) => {
        let dessert = new Dessert(
          element["title"],
          element["image"],
          element["price"],
          element["weight"],
          element["id"],
          element["tags"],
          element["description"]
        );
        this.addAnyDesssert(dessert);
        this.addDessertOnly(dessert);
        this.addIcecream(dessert);
      });
    }
  }
  return new DessertManager();
})();
