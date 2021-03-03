// without the half and half pizza
const allPizzasData = [
  {
    "title": PIZZA_NAMES_CONSTANTS.CUSTOM_PIZZA,
    "id": "pi1",
    "price": [6.50, 8.90, 10.50],
    "image": "pizzas/1266medium.png",
    "tags": [],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.MARGHERITA,
    "id": "pi2",
    "price": [7.90, 11.00, 13.40],
    "image": "pizzas/1265medium_marg.png",
    "tags": [SORTING_TAGS_CONSTANTS.VEGETARIAN],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": true },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.RIVERONI,
    "id": "pi3",
    "price": [12.90, 15.90, 18.90],
    "image": "pizzas/1593medium_river.png",
    "tags": [],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.VENTRICHINA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.PEPPERONI, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.BEAST_V2,
    "id": "pi4",
    "price": [11.90, 14.90, 17.90],
    "image": "pizzas/1555medium_zverska.png",
    "tags": [SORTING_TAGS_CONSTANTS.NEW],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.SMOCKED_HAM, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.SMOCKED_BACON, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.CHORISO, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.CHICKENITA,
    "id": "pi5",
    "price": [11.90, 14.90, 17.90],
    "image": "pizzas/1341medium_chicken.png",
    "tags": [],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.CHICKEN, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.PEPPERONI, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.FRESH_TOMATOES, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.EMMENTAL, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.DOMINOS_SPECIAL,
    "id": "pi6",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1290medium_dominos.png",
    "tags": [],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.SMOCKED_HAM, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.SMOCKED_BACON, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.FRESH_GREEN_PEPPERS, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.ONION, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.FRESH_MUSHROOMS, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.CHICK_CHI_RICK,
    "id": "pi7",
    "price": [11.90, 14.90, 17.90],
    "image": "pizzas/1342medium_chick.png",
    "tags": [],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.CHICKEN, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.SMOKED_CHEESE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.CORN, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.CARBONARA,
    "id": "pi8",
    "price": [9.90, 12.90, 15.90],
    "image": "pizzas/1360medium_carbonara.png",
    "tags": [],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.CREAM, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.SMOCKED_BACON, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.FRESH_MUSHROOMS, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.AMERICAN_HOT,
    "id": "pi9",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1291medium_american.png",
    "tags": [SORTING_TAGS_CONSTANTS.SPICY],
    "ingredients": [
      { "title": INGREDIENT_NAMES_CONSTANTS.TOMATO_SAUCE, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.MOZZARELLA, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.PEPPERONI, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.JALAPENO_PEPPER, "isAdditional": false },
      { "title": INGREDIENT_NAMES_CONSTANTS.ONION, "isAdditional": false },
    ],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.GARDEN_CLASSIC,
    "id": "pi10",
    "price": [8.90, 11.90, 14.90],
    "image": "pizzas/1295medium_garden.png",
    "tags": [SORTING_TAGS_CONSTANTS.VEGETARIAN],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.PEPPERONI_CLASSIC,
    "id": "pi11",
    "price": [11.90, 14.90, 17.90],
    "image": "pizzas/1293medium_pepperoni.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.BARBECUE_CHICKEN,
    "id": "pi12",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1302medium_bbq-chicken.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.BARBECUE_CLASSIC,
    "id": "pi13",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1298medium_bbq-classic.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.NEW_YORK,
    "id": "pi14",
    "price": [11.90, 14.90, 17.90],
    "image": "pizzas/1300medium_new-york.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.HAM_CLASSIC,
    "id": "pi15",
    "price": [8.90, 11.90, 14.90],
    "image": "pizzas/1292medium_ham-classic.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.ITALIAN_CLASSIC,
    "id": "pi16",
    "price": [9.90, 12.90, 15.90],
    "image": "pizzas/1355medium_italian.png",
    "tags": [SORTING_TAGS_CONSTANTS.VEGETARIAN],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.HAWAII,
    "id": "pi17",
    "price": [8.90, 11.90, 14.90],
    "image": "pizzas/1313medium_hawaian.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.FOUR_CHEESES,
    "id": "pi18",
    "price": [9.90, 12.90, 15.90],
    "image": "pizzas/1312medium_formaggi.png",
    "tags": [SORTING_TAGS_CONSTANTS.VEGETARIAN],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.TUNA_PIZZA,
    "id": "pi19",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1363medium_tuna.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.MEAT_MANIA,
    "id": "pi20",
    "price": [12.90, 15.90, 18.90],
    "image": "pizzas/1364medium_meat-mania.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.EXTRAVAGANZA,
    "id": "pi21",
    "price": [11.90, 14.90, 17.90],
    "image": "pizzas/1631medium_extravaganca.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.BURGER_PIZZA,
    "id": "pi22",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1505medium_burger.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.MASTER_BURGER_PIZZA,
    "id": "pi23",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1535medium_master-burger.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.FASTING_V2,
    "id": "pi24",
    "price": [8.90, 11.90, 14.90],
    "image": "pizzas/1616medium_vegan.png",
    "tags": [SORTING_TAGS_CONSTANTS.FASTING, SORTING_TAGS_CONSTANTS.VEGETARIAN],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.RANCHERA,
    "id": "pi25",
    "price": [9.90, 12.90, 15.90],
    "image": "pizzas/1619medium_ranchera.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.PIZZA_OSLO_CREAM,
    "id": "pi26",
    "price": [12.90, 15.90, 18.90],
    "image": "pizzas/1625medium_oslo-pizza.png",
    "tags": [],
    "ingredients": [],
  },
  {
    "title": PIZZA_NAMES_CONSTANTS.PIZZA_GAUCHO,
    "id": "pi27",
    "price": [10.90, 13.90, 16.90],
    "image": "pizzas/1643medium_gaucho.png",
    "tags": [SORTING_TAGS_CONSTANTS.NEW, SORTING_TAGS_CONSTANTS.SPICY],
    "ingredients": [],
  },
];
