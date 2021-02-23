// super class for all products(pizzas,chicken,desserts,drinks,pasta,salads,sandwiches,sauces,starters);
const product = (function () {
    class Product {
        constructor(title, image, price, weight) {
            this.title = title;
            this.image = image;
            this.price = price;
            this.weight = weight;
        }
    }
    return new Product();
})();