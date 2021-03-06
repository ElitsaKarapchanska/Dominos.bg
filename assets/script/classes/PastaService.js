const pastaManager = (function () {
  class Pasta extends CustomizableProduct {
    constructor(title, image, price, weight, id, tags, ingredients, initialIngredients) {
      super(title, image, price, weight, id, "pasta", tags, ingredients, initialIngredients);
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
          element["ingredients"].map((ingredient) =>
            ingredientManager.getIngredientCopy(
              ingredient["title"],
              ingredient["isAdditional"]
            )
          )
        );
        this.addAnyPasta(pasta);
        this.addNewPasta(pasta);
        this.addSpicyPasta(pasta);
      });
    }

    getProductCopy(product) {
      return new Pasta(
        product.title,
        product.image,
        product.price,
        product.weight,
        product.id,
        product.tags,
        product.ingredients.map((ingredient) =>
          ingredientManager.getIngredientCopy(
            ingredient["title"],
            ingredient["isAdditional"]
          )
        ),
        product.initialIngredients.map((ingredient) =>
          ingredientManager.getIngredientCopy(
            ingredient["title"],
            ingredient["isAdditional"]
          )
        )
      );
    }
  }
  return new PastaManager();
})();
