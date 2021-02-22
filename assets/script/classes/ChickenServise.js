const chickenManager = (function () {
    class Chicken extends Product {
        constructor(description, title, price, weight, image) {
            super(title, image, price, weight, tags);
            this.description = description;
            this.tags = tags;;
        }
    }
    class ChickenManager {
        constructor() {
            this.allChicken = [];
        }
    }
    return new ChickenManager();
})();
