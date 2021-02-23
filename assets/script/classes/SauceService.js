const sauceManager = (function () {
    class Sauce extends Product {
        constructor(title, image, price, weight, description) {
            super(title, image, price, weight);
            this.description = description;
            this.tags = []; // array from tags;
        }
    }
    class SauceManager {
        constructor() {
            this.newSauces = [];
            this.spicySauces = [];
            this.allSauces = [];
        }
    }
    return new SauceManager();
})();
