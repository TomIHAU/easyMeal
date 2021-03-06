const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Purchase extends Model {}

Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    purchaseOrder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "purchaseOrder",
        key: "id",
      },
    },
    meal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "meal",
        key: "id",
      },
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "purchase",
  }
);

module.exports = Purchase;
