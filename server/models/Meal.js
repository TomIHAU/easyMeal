const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Meal extends Model {}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    MealName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Protein: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Fat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Carbs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "meal",
  }
);

module.exports = Meal;
