const userStorage = (function () {
  class User {
    constructor(
      email,
      pass,
      fName,
      lName,
      subbedToOffers,
      subbedToNews,
      favourites = [],
      cart = {}
    ) {
      this.email = email;
      this.pass = pass;
      this.fName = fName;
      this.lName = lName;
      this.subbedToOffers = subbedToOffers;
      this.subbedToNews = subbedToNews;
      this.favourites = favourites;
      this.cart = new Cart(cart.products, cart.productsWithIDs);
    }

    addToFavourites(product) {
      if (!(product instanceof Product)) return false;

      let faves = JSON.stringify(this.favourites);
      if (faves.includes(JSON.stringify(product))) return false;
      this.favourites.push(product);
    }

    removeFromFavourites(product) {
      if (!(product instanceof Product)) return false;

      let productToRemoveStr = JSON.stringify(product);
      let indexInFaves = this.favourites.findIndex((entry) => {
        return JSON.stringify(entry.prod) === productToRemoveStr;
      });
      if (indexInFaves < 0) return false;
      this.favourites.splice(indexInFaves, 1);
    }
  }

  class Cart {
    constructor(products = [], productsWithIDs = []) {
      // [{prod: product, quantity: 1, priceModifiers: 0}]
      if (productsWithIDs.length > 0) {
        this.productsWithIDs = productsWithIDs;
      } else {
        this.productsWithIDs = products.map((product) => ({
          ...product,
          uuid: Date.now(),
        }));
      }
      this.products = products;

      console.log(this.productsWithIDs);

      this.finalPrice = this.getTotalPrice();
    }

    getTotalPrice() {
      return this.products.reduce(
        (sum, el) => (sum += Product.getFinalPrice(el) * el.quantity),
        0
      );
    }

    getIndexInCartByUUID(uuid) {
      return this.productsWithIDs.findIndex((entry) => entry.uuid === uuid);
    }

    searchInCartByProduct(product) {
      let searched = JSON.stringify(product);
      return this.products.find((entry) => {
        return JSON.stringify(entry) === searched;
      });
    }

    getIndexInCartByProduct(product) {
      let searched = JSON.stringify(product);
      return this.products.findIndex((entry) => {
        return JSON.stringify(entry) === searched;
      });
    }

    /**
     * Increments or decrements the quantity of a specific product in the cart
     * @param {Product} product
     * @param {Boolean} toIncrement wether to increment or decrement
     * @param {Number} amount
     */
    editCartProductQuantity(product, toIncrement, amount = 1) {
      // check if already in cart
      console.log(product);
      
      let matchInCartIndex = this.getIndexInCartByProduct(product);
      console.log(matchInCartIndex);
      
      if (matchInCartIndex >= 0) {
        if (toIncrement) {
          this.products[matchInCartIndex].quantity += amount;
          this.productsWithIDs[matchInCartIndex].quantity += amount;
        } else {
          this.products[matchInCartIndex].quantity -= amount;
          this.productsWithIDs[matchInCartIndex].quantity -= amount;
        }
        // if the quantity of the product becomes 0 or less, remove it from cart
        if (this.products[matchInCartIndex].quantity <= 0) {
          // remove from both arrays
          this.productsWithIDs.splice(matchInCartIndex, 1);
          this.products.splice(matchInCartIndex, 1);
        }
        this.finalPrice = this.getTotalPrice();
        console.log(this);
        
        return true;
      }
      return false;
    }

    addToCart(product, quantity, priceModifiers = 0) {
      if (!this.editCartProductQuantity(product, true, quantity)) {
        this.productsWithIDs.push({
          prod: product,
          quantity: quantity,
          priceModifiers: priceModifiers,
          uuid: Date.now(),
        });

        this.products.push({
          prod: product,
          quantity: quantity,
          priceModifiers: priceModifiers,
        })

        this.finalPrice = this.getTotalPrice();
      }
      return this.products.length;
    }

    removeFromCart(product) {
      let indexInCart = this.getIndexInCartByProduct(product);
      if (indexInCart < 0) return false;
      this.productsWithIDs.splice(indexInCart, 1);
      this.products.splice(indexInCart, 1);
      this.finalPrice = this.getTotalPrice();
    }
  }

  class UserStorage {
    constructor() {
      if (localStorage.getItem("users")) {
        this.users = this.createUsersFromObjects(
          JSON.parse(localStorage.getItem("users"))
        );
      } else {
        this.users = [
          new User("admin", "admin", "admin", "admin", false, false),
          new User("test", "test", "test", "test", false, false),
        ];
        localStorage.setItem("users", JSON.stringify(this.users));
      }

      if (localStorage.getItem("loggedInUser")) {
        let loggedInUserData = JSON.parse(localStorage.getItem("loggedInUser"));
        this.loggedInUser = this.searchUserByEmail(loggedInUserData.email);
      } else {
        this.loggedInUser = null;
      }
    }

    createUsersFromObjects(arr) {
      return arr.map((user) => {
        return new User(
          user.email,
          user.pass,
          user.fName,
          user.lName,
          user.subbedToOffers,
          user.subbedToNews,
          user.favourites,
          user.cart
        );
      });
    }

    searchUserByEmail(email) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === email) {
          return this.users[i];
        }
      }
      return null;
    }

    register(
      email,
      pass,
      confirmPass,
      fName,
      lName,
      hasAgreedToData,
      hasAgreedToConf,
      subbedToOffers,
      subbedToNews
    ) {
      let dataIsValid = this.validate(
        email,
        pass,
        confirmPass,
        fName,
        lName,
        hasAgreedToData,
        hasAgreedToConf
      );

      if (dataIsValid) {
        this.users.push(
          new User(email, pass, fName, lName, subbedToOffers, subbedToNews)
        );
        localStorage.setItem("users", JSON.stringify(this.users));
        return true;
      }
    }

    login(email, pass, rememberMe = true) {
      let user = this.searchUserByEmail(email);
      if (user && user.pass === pass) {
        this.loggedInUser = user;
        localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));

        // To Do: add functionality so that it works
        // if (rememberMe) {
        //   localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
        // } else {
        //   sessionStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
        // }
        return true;
      }
      return false;
    }

    logout() {
      this.loggedInUser = null;
      localStorage.removeItem("loggedInUser");
    }

    validate(
      email,
      pass,
      confirmPass,
      fName,
      lName,
      hasAgreedToData,
      hasAgreedToConf
    ) {
      if (pass !== confirmPass) return false;

      // validate email with regex
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) return false;

      if (pass.trim().length < 6) return false;
      if (fName.trim().length < 3 || lName.trim().length < 3) return false;
      if (!hasAgreedToData || !hasAgreedToConf) return false;

      // check user with this email is not already registered
      let userIsAlreadyRegistered = this.searchUserByEmail(email);
      if (userIsAlreadyRegistered) return false;

      return true;
    }

    addToFavourites(product) {
      if (!this.loggedInUser) return false;
      this.loggedInUser.addToFavourites(product);

      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    }

    removeFromFavourites(product) {
      if (!this.loggedInUser) return false;
      this.loggedInUser.removeFromFavourites(product);

      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    }

    addToCart(product, quantity, priceModifiers = 0) {
      if (!this.loggedInUser) return false;

      // if the product is not already in the cart, add it
      this.loggedInUser.cart.addToCart(product, quantity, priceModifiers);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
      return this.loggedInUser.cart.products.length;
    }

    /**
     * Increments or decrements the quantity of a specific product in the cart
     * @param {Product} product
     * @param {Boolean} toIncrement wether to increment or decrement
     * @param {Number} amount
     */
    editCartProductQuantity(product, toIncrement, amount = 1) {
      if (!this.loggedInUser) return false;
      console.log(this.loggedInUser.cart);
      
      this.loggedInUser.cart.editCartProductQuantity(product, toIncrement, amount);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    }

    removeFromCart(product) {
      if (!this.loggedInUser) return false;
      this.loggedInUser.cart.removeFromCart(product);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    }

    setDeliveryChoice(toDeliver) {
      // expires very quickly, so we put them in sessionStorage instead of localStorage
      sessionStorage.setItem("toDeliver", toDeliver);
    }

    getDeliveryChoice() {
      return JSON.parse(sessionStorage.getItem("toDeliver"));
    }

    setRestaurant(restaurantIndex) {
      // expires very quickly, so we put them in sessionStorage instead of localStorage
      sessionStorage.setItem(
        "restaurant",
        JSON.stringify({
          restaurantName: ALL_RESTAURANTS[restaurantIndex],
          restaurantIndex: restaurantIndex,
        })
      );
    }

    getRestaurant() {
      if (JSON.parse(sessionStorage.getItem("restaurant"))) {
        return JSON.parse(sessionStorage.getItem("restaurant")).restaurantName;
      }
      return null;
    }
  }

  return new UserStorage();
})();
