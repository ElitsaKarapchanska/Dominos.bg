const starterManager = (function () {
    class Starter extends Product {
        constructor(title, price, weight, image, description) {
            super(title, image, price, weight);
            this.description = description;
            this.tags = [];
        }
    }
    class StarterManager {
        constructor() {
            this.newStarters = [];
            this.spicyStarter = [];
            this.allStarters = [];
        }
    }
    return new StarterManager();
})
