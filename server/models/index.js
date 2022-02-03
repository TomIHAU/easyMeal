const Meal = require("./Meal");
const User = require("./User");
const Purchase = require("./Purchase");

User.hasMany(Purchase, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Purchase.belongsTo(User, {
  foreignKey: "user_id",
});
Meal.hasMany(Purchase, {
  foreignKey: "meal_id",
  onDelete: "CASCADE",
});
Purchase.belongsTo(Meal, {
  foreignKey: "meal_id",
});
module.exports = { Meal, User, Purchase };
