const Meal = require("./Meal");
const User = require("./User");
const Purchase = require("./Purchase");
const PurchaseOrder = require("./PurchaseOrder");

User.hasMany(PurchaseOrder, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
PurchaseOrder.belongsTo(User, {
  foreignKey: "user_id",
});

PurchaseOrder.hasMany(Purchase, {
  foreignKey: "purchaseOrder_id",
  onDelete: "CASCADE",
});
Purchase.belongsTo(PurchaseOrder, {
  foreignKey: "purchaseOrder_id",
});

Meal.hasMany(Purchase, {
  foreignKey: "meal_id",
  onDelete: "CASCADE",
});
Purchase.belongsTo(Meal, {
  foreignKey: "meal_id",
});

module.exports = { Meal, User, Purchase, PurchaseOrder };
