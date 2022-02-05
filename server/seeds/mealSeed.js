const { Meal } = require("../models");

const mealData = [
  {
    mealName: "Bibimbap",
    protein: 40,
    fat: 30,
    carbs: 20,
    price: 9.74,
    img: "/img/bibimbap.jpg",
    mealDes:
      "noun. the food served and eaten especially at one of the customary, regular occasions for taking food during the day, as breakfast, lunch, or supper. one of these regular occasions or times for eating food.",
  },
  {
    mealName: "Chicken Bake",
    protein: 22,
    fat: 10,
    carbs: 20,
    price: 11.74,
    img: "/img/chickenBake.jpg",
    mealDes:
      "This Creamy Chicken Bake recipe will impress you with its taste. Chicken breast in a creamy sauce can be served as a main course, or as a snack. This dish is beautiful, juicy and so creamy.",
  },
  {
    mealName: "Chicken and Hummus",
    protein: 45,
    fat: 30,
    carbs: 5,
    price: 9.68,
    img: "/img/ChickenHummus.jpg",
    mealDes:
      "Hellooo healthy, satisfying, & mega-flavorful Hummus Bowls! A grain bowl centered around creamy, dreamy hummus, piled high with homemade chicken shawarma (or roasted veggie shawarma for a plant-based option!), & finished with whatever toppings you love most – fluffy quinoa, crunchy cabbage, creamy feta, tangy pickled red onions, & more. These flavorful hummus bowls are the perfect easy weeknight dinner",
  },
  {
    mealName: "Chicken Pasta",
    protein: 15,
    fat: 12,
    carbs: 22,
    price: 14.21,
    img: "/img/ChickenPasta.jpg",
    mealDes:
      "Creamy Chicken Alfredo with sun dried tomato, spinach and bacon, you’ll love how the seasoned shredded chicken acts like a mop for the alfredo sauce. ",
  },
  {
    mealName: "Chicken Satay",
    protein: 60,
    fat: 30,
    carbs: 30,
    price: 10.74,
    img: "/img/ChickenSatay.jpg",
    mealDes:
      "Thai Chicken Satay skewers with Thai Peanut Sauce – the gold standard of authentic Thai food! Marinated chicken with a peanut sauce that’s so good, everyone will be begging for the recipe – and will be astonished how EASY it is! Serve this with steamed jasmine ",
  },
  {
    mealName: "Pasta Salad",
    protein: 60,
    fat: 30,
    carbs: 30,
    price: 10.99,
    img: "/img/pastaSalad.jpg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Salad",
    protein: 60,
    fat: 30,
    carbs: 30,
    price: 10.74,
    img: "/img/salad.jpeg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Bibimbap",
    protein: 41,
    fat: 30,
    carbs: 20,
    price: 9.77,
    img: "/img/bibimbap.jpg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Chicken Bake",
    protein: 22,
    fat: 10,
    carbs: 20,
    price: 14.44,
    img: "/img/chickenBake.jpg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Chicken and Hummus",
    protein: 55,
    fat: 30,
    carbs: 5,
    price: 9.74,
    img: "/img/ChickenHummus.jpg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Chicken Pasta",
    protein: 10,
    fat: 10,
    carbs: 20,
    price: 14.74,
    img: "/img/ChickenPasta.jpg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Chicken Satay",
    protein: 60,
    fat: 32,
    carbs: 40,
    price: 10.12,
    img: "/img/ChickenSatay.jpg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Pasta Salad",
    protein: 60,
    fat: 30,
    carbs: 30,
    price: 10.14,
    img: "/img/pastaSalad.jpg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    mealName: "Salad",
    protein: 70,
    fat: 30,
    carbs: 30,
    price: 10.16,
    img: "/img/salad.jpeg",
    mealDes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const seedMeals = () => Meal.bulkCreate(mealData);

module.exports = seedMeals;
