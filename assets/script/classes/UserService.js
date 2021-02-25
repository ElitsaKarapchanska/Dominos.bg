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
      if (this.loggedInUser) {
        this.loggedInUser.favourites.push(product);
        localStorage.setItem("users", JSON.stringify(this.users));
      }
    }

    addToCart(product) {
      if (!(product instanceof Product)) return false;
      // if there is a current loggedInUser -> add to his cart and save all in local storage
      if (this.loggedInUser) {
        this.loggedInUser.cart.push(product);
        localStorage.setItem("users", JSON.stringify(this.users));
      }
    }
  }

  return new UserStorage();
})();
