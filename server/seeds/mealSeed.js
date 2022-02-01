const { Meal } = require("../models");

const mealData = [
  {
    mealName: "Rice",
    protein: 40,
    fat: 30,
    carbs: 20,
    price: 9.74,
    img: "./img/bibimbap.jpg",
  },
  {
    mealName: "Paste",
    protein: 20,
    fat: 10,
    carbs: 20,
    price: 11.74,
    img: "./img/bibimbap.jpg",
  },
  {
    mealName: "Pizza",
    protein: 50,
    fat: 30,
    carbs: 5,
    price: 9.74,
    img: "./img/bibimbap.jpg",
  },
  {
    mealName: "Spam",
    protein: 10,
    fat: 0,
    carbs: 20,
    price: 14.74,
    img: "./img/bibimbap.jpg",
  },
  {
    mealName: "Chicken",
    protein: 60,
    fat: 30,
    carbs: 30,
    price: 10.74,
    img: "./img/bibimbap.jpg",
  },
];

const seedMeals = () => Meal.bulkCreate(mealData);

module.exports = seedMeals;
