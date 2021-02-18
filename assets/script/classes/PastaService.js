const pastaManager = (function () {
    class Pasta extends Product {
        constructor(title, image, price, weight) {
            super(title, image, price, weight);
            this.ingredients = []; // array from Ingredients;
            this.tags = [];
        }
    }
    class PastaManager {
        constructor() {
            this.allPasta = [];
            this.spicyPasta = [];
            this.newPasta = [];
        }
    }
    return new PastaManager();
})
