const pastaManager = (function () {
  class Pasta extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients) {
      super(title, image, price, weight, id, "pasta", tags, ingredients);
    }
  }
  
  class PastaManager extends CustomizableProductManager {
    constructor() {
      super();
      this.allPasta = [];
      this.spicyPasta = [];
      this.newPasta = [];
    }

    addAnyPasta(pasta) {
      if (pasta instanceof Pasta) this.allPasta.push(pasta);
    }

    addNewPasta(pasta) {
      if (pasta instanceof Pasta && pasta.tags.includes("НОВО")) {
        this.newPasta.push(pasta);
      }
    }

    addSpicyPasta(pasta) {
      if (pasta instanceof Pasta && pasta.tags.includes("ПИКАНТНО")) {
        this.spicyPasta.push(pasta);
      }
    }

    addAllPastaProducts(pastaJSON) {
      if (!Array.isArray(pastaJSON)) return false;
      pastaJSON.forEach((element) => {
        let pasta = new Pasta(
          element["title"],
          element["image"],
          element["price"],
          element["weight"],
          element["id"],
          element["tags"],
          element["ingredients"]
        );
        this.addAnyPasta(pasta);
        this.addNewPasta(pasta);
        this.addSpicyPasta(pasta);
      });
    }
  }
  return new PastaManager();
})();
