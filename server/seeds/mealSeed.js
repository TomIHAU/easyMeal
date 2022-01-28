const { Meal } = require("../models");

const mealData = [
  {
    mealName: "Rice",
    protein: 40,
    fat: 30,
    carbs: 20,
  },
  {
    mealName: "Paste",
    protein: 20,
    fat: 10,
    carbs: 20,
  },
  {
    mealName: "Pizza",
    protein: 50,
    fat: 30,
    carbs: 5,
  },
  {
    mealName: "Spam",
    protein: 10,
    fat: 0,
    carbs: 20,
  },
  {
    mealName: "Chicken",
    protein: 60,
    fat: 30,
    carbs: 30,
  },
];

const seedMeals = () => Meal.bulkCreate(mealData);

module.exports = seedMeals;
