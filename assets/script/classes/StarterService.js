const starterManager = (function () {
  class Starter extends SimpleProduct {
    constructor(title, image, price, weight, id, tags, description) {
      super(title, image, price, weight, id, "starter", tags, description);
    }
  }

  class StarterManager {
    constructor() {
      this.newStarters = [];
      this.spicyStarters = [];
      this.allStarters = [];
    }

    addAnyStarter(starter) {
      if (starter instanceof Starter) this.allStarters.push(starter);
    }

    addNewStarter(starter) {
      if (starter instanceof Starter && starter.tags.includes("НОВО")) {
        this.newStarters.push(starter);
      }
    }

    addSpicyStarter(starter) {
      if (starter instanceof Starter && starter.tags.includes("ПИКАНТНО")) {
        this.spicyStarters.push(starter);
      }
    }

    addAllStarterProducts(startersJSON) {
      if (!Array.isArray(startersJSON)) return false;
      startersJSON.forEach((element) => {
        let starter = new Starter(
          element["title"],
          element["image"],
          element["price"],
          element["weight"],
          element["id"],
          element["tags"],
          element["description"]
        );
        this.addAnyStarter(starter);
        this.addNewStarter(starter);
        this.addSpicyStarter(starter);
      });
    }
  }
  return new StarterManager();
})();
