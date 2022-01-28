const sequelize = require("../config/connection");
const { Meal } = require("../models");

const mealSeed = require("./mealSeed");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await mealSeed();
    console.log("\n----- MEALS SYNCED -----\n");

    process.exit(0);
  } catch (e) {
    console.log(e);
  }
};

seedDatabase();
