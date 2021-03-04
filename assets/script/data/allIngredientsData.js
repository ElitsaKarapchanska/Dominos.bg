// object with keys - the category names and values - an array of the ingredient objects
// "prices" are 0 for the first of it's category and + 2 for every next one with some exceptions (on big pizzas)
const allIngredientsData = {
  SAUCES: [
    {
      "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE,
      "id": 1,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.CREAM,
      "id": 2,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.BBQ,
      "id": 3,
      "price": [0, 2],
    },
  ],
  HERBS: [
    {
      "title": INGREDIENT_NAMES_CONSTANTS.PARMESAN_SPRINKLES,
      "id": 4,
      "price": [0.5, 0.5],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.BASIL,
      "id": 5,
      "price": [0, 0],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.OREGANO,
      "id": 6,
      "price": [0, 0],
    },
  ],
  CHEESES: [
    {
      "title": INGREDIENT_NAMES_CONSTANTS.EMMENTAL,
      "id": 7,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.FETA,
      "id": 8,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA,
      "id": 9,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.SMOKED_CHEESE,
      "id": 10,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.PARMESAN,
      "id": 11,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.VEGAN_MOZZARELLA,
      "id": 12,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.CHEDDAR,
      "id": 13,
      "isAdditional": false,
      "price": [0, 2],
    },
  ],
  MEATS: [
    {
      "title": INGREDIENT_NAMES_CONSTANTS.PULLED_BEEF,
      "id": 14,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.SPICY_BEEF,
      "id": 15,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.SMOCKED_HAM,
      "id": 16,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.SMOCKED_BACON,
      "id": 17,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.CHORISO,
      "id": 18,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.VENTRICHINA,
      "id": 19,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.CHICKEN,
      "id": 20,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.PEPPERONI,
      "id": 21,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.TUNA,
      "id": 22,
      "price": [0, 2],
    },
  ],
  VEGETABLES: [
    {
      "title": INGREDIENT_NAMES_CONSTANTS.ARUGULA,
      "id": 23,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.PICKLES,
      "id": 24,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.CORN,
      "id": 25,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.ONION,
      "id": 26,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.BLACK_OLIVES,
      "id": 27,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.PINAPPLE,
      "id": 28,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.FRESH_TOMATOES,
      "id": 29,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.FRESH_MUSHROOMS,
      "id": 30,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.FRESH_GREEN_PEPPERS,
      "id": 31,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.JALAPENO_PEPPER,
      "id": 32,
      "price": [0, 2],
    },
  ],
  MISC: [
    {
      "title": INGREDIENT_NAMES_CONSTANTS.PESTO,
      "id": 33,
      "price": [0, 2],
    },
    {
      "title": INGREDIENT_NAMES_CONSTANTS.CARAMELIZED_ONIONS,
      "id": 34,
      "price": [0, 2],
    },
  ],
};
