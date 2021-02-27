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
  }

  class UserStorage {
    constructor() {
      if (localStorage.getItem("users")) {
        this.users = JSON.parse(localStorage.getItem("users"));
      } else {
        this.users = [
          new User("admin", "admin", "admin", "admin", false, false),
          new User("test", "test", "test", "test", false, false),
        ];
        localStorage.setItem("users", JSON.stringify(this.users));
      }

      if (localStorage.getItem("loggedInUser")) {
        this.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      } else {
        this.loggedInUser = null;
      }
    }

    searchUserByEmail(email) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === email) {
          return i;
        }
      }
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

    login(email, pass) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === email && this.users[i].pass === pass) {
          this.loggedInUser = this.users[i];
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(this.loggedInUser)
          );
          return true;
        }
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
      let userIsAlreadyRegistered = this.users.some(
        (user) => user.email === email
      );
      if (userIsAlreadyRegistered) return false;

      return true;
    }

    addToFavourites(product) {
      if (!(product instanceof Product)) return false;
      // if there is a current loggedInUser -> add to his faves and save all in local storage
      if (!this.loggedInUser) return false;
      // check if already in favourites with stringify since they could have added a pizza with custom
      // ingredients and this seems like the easiest way to compare
      let faves = JSON.stringify(this.loggedInUser.favourites);
      if (faves.includes(JSON.stringify(product))) return false;
      this.loggedInUser.favourites.push(product);
      localStorage.setItem("users", JSON.stringify(this.users));
    }

    removeFromFavourites(product) {
      // TODO
    }

    addToCart(product, quantity) {
      // if the product is not already in the cart, add it
      if (!this.editCartProductQuantity(product, true, quantity)) {
        this.loggedInUser.cart.push({ prod: product, quantity: quantity });
        localStorage.setItem("users", JSON.stringify(this.users));
      }
      return this.loggedInUser.cart.length;
    }

    /**
     * Increments or decrements the quantity of a specific product in the cart
     * @param {Product} product
     * @param {Boolean} toIncrement wether to increment or decrement
     * @param {Number} amount 
     */
    editCartProductQuantity(product, toIncrement, amount = 1) {
      if (!(product instanceof Product)) return false;
      if (!this.loggedInUser) return false;

      // check if already in cart with stringify since they could have added a pizza with custom
      // ingredients and this seems like the easiest way to compare
      let editProductStr = JSON.stringify(product);
      let matchInCart = this.loggedInUser.cart.find((entry) => {
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
        localStorage.setItem("users", JSON.stringify(this.users));
        return true;
      }
      return false;
    }

    removeFromCart(product) {
      if (!(product instanceof Product)) return false;
      if (!this.loggedInUser) return false;

      let productToRemoveStr = JSON.stringify(product);
      let indexInCart = this.loggedInUser.cart.findIndex((entry) => {
        return JSON.stringify(entry.prod) === productToRemoveStr;
      });
      if (indexInCart < 0) return false;
      this.loggedInUser.cart.splice(indexInCart, 1);
    }
  }

  return new UserStorage();
})();
