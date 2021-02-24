const sauceManager = (function () {
  class Sauce extends SimpleProduct {
    constructor(title, image, price, weight, id, tags, description) {
      super(title, image, price, weight, id, "sauce", tags, description);
    }
  }

  class SauceManager {
    constructor() {
      this.newSauces = [];
      this.spicySauces = [];
      this.allSauces = [];
    }

    addAnySauce(sauce) {
      if (sauce instanceof Sauce) this.allSauces.push(sauce);
    }

    addNewSauce(sauce) {
      if (sauce instanceof Sauce && sauce.tags.includes("НОВО")) {
        this.newSauces.push(sauce);
      }
    }

    addSpicySauce(sauce) {
      if (sauce instanceof Sauce && sauce.tags.includes("ПИКАНТНО")) {
        this.spicySauces.push(sauce);
      }
    }

    addAllSauceProducts(saucesJSON) {
      if (!Array.isArray(saucesJSON)) return false;
      saucesJSON.forEach((element) => {
        let sauce = new Sauce(
          element["title"],
          element["image"],
          element["price"],
          element["weight"],
          element["id"],
          element["tags"],
          element["description"]
        );
        this.addAnySauce(sauce);
        this.addNewSauce(sauce);
        this.addSpicySauce(sauce);
      });
    }
  }
  return new SauceManager();
})();
