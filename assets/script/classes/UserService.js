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
      cart = []
    ) {
      this.email = email;
      this.pass = pass;
      this.fName = fName;
      this.lName = lName;
      this.subbedToOffers = subbedToOffers;
      this.subbedToNews = subbedToNews;
      this.favourites = favourites;
      this.cart = cart;
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

    /**
     * Increments or decrements the quantity of a specific product in the cart
     * @param {Product} product
     * @param {Boolean} toIncrement wether to increment or decrement
     * @param {Number} amount
     */
    editCartProductQuantity(product, toIncrement, amount = 1) {
      if (!(product instanceof Product)) return false;

      // check if already in cart with stringify since they could have added a pizza with custom
      // ingredients and this seems like the easiest way to compare
      let editProductStr = JSON.stringify(product);
      let matchInCart = this.cart.find((entry) => {
        return JSON.stringify(entry.prod) === editProductStr;
      });
      if (matchInCart) {
        toIncrement
          ? (matchInCart.quantity += amount)
          : (matchInCart.quantity -= amount);

        // if the quantity of the product becomes 0 or less, remove it from cart
        if (matchInCart.quantity <= 0) {
          // possible because they have the same reference
          let index = this.loggedInUser.cart.indexOf(matchInCart);
          this.loggedInUser.cart.splice(index, 1);
        }
        return true;
      }
      return false;
    }

    addToCart(product, quantity) {
      if (!this.editCartProductQuantity(product, true, quantity)) {
        this.cart.push({ prod: product, quantity: quantity });
      }
      return this.cart.length;
    }

    removeFromCart(product) {
      if (!(product instanceof Product)) return false;

      let productToRemoveStr = JSON.stringify(product);
      let indexInCart = this.cart.findIndex((entry) => {
        return JSON.stringify(entry.prod) === productToRemoveStr;
      });
      if (indexInCart < 0) return false;
      this.cart.splice(indexInCart, 1);
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

    addToCart(product, quantity) {
      if (!this.loggedInUser) return false;

      // if the product is not already in the cart, add it
      this.loggedInUser.addToCart(product, quantity);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
      return this.loggedInUser.cart.length;
    }

    /**
     * Increments or decrements the quantity of a specific product in the cart
     * @param {Product} product
     * @param {Boolean} toIncrement wether to increment or decrement
     * @param {Number} amount
     */
    editCartProductQuantity(product, toIncrement, amount = 1) {
      if (!this.loggedInUser) return false;
      this.loggedInUser.editCartProductQuantity(product, toIncrement, amount);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    }

    removeFromCart(product) {
      if (!this.loggedInUser) return false;
      this.loggedInUser.removeFromCart(product);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    }
  }

  return new UserStorage();
})();
