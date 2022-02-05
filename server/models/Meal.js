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
    mealName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // mealDes: {
    //   type: DataTypes.STRING(2000),
    //   allowNull: true,
    // },
    protein: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carbs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
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
