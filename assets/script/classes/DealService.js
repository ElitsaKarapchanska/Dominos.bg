const dealManager = (function () {
  class Deal {
    constructor(title, image, description, price) {
      this.image=image;
      this.title = title;
      this.price = price;
      this.description = description;
    }
  }
  class DealManager {
    constructor() {
      this.allDeals = [];
    }
    
    addDeal(deal) {
      if (deal instanceof Deal) this.allDeals.push(deal);
    }
   
    addAllDealProducts(dealsJSON) {
      if (!Array.isArray(dealsJSON)) return false;
      dealsJSON.forEach((element) => {
        this.addDeal(
          new Deal(
            element["title"],
            element["image"],
            element["description"],
            element["price"]
          )
        );
      });
    }
  }
  return new DealManager();
})();
