const sandwichManager = (function () {
    class Sandwich extends Product {
        constructor(title, price, image, weight) {
            super(title, price, image, weight);
            this.ingredients = []; // array from Ingredients;
            this.tags = []; // array from tags;
        }
    }
    class SandwichManager {
        constructor() {
            this.allSandwiches = [];
        }
    }
    return new SandwichManager();
})
