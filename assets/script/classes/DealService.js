const dealManager = (function () {
    class Deal {
        constructor(title, price, description) {
            this.title = title;
            this.price = price;
            this.description = description;
        }
    }
    class DealManager {
        constructor() {
            this.allDeals = [];
        }
    }
    return new DealManager();
})
