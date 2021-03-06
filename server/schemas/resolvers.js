const { AuthenticationError } = require("apollo-server-express");
const { Meal, User, Purchase, PurchaseOrder, Address } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    meals: async () => {
      const mealData = await Meal.findAll({});
      const meals = await mealData.map((Data) => Data.get({ plain: true }));
      return meals;
    },
    users: async () => {
      const userData = await User.findAll({});
      const users = await userData.map((Data) => Data.get({ plain: true }));
      return users;
    },
    user: async (root, args) => {
      const userData = await User.findByPk(args.id);
      const user = await userData.get({ plain: true });
      return user;
    },
    purchases: async () => {
      const purchaseData = await Purchase.findAll({});
      const purchases = await purchaseData.map((Data) =>
        Data.get({ plain: true })
      );
      return purchases;
    },
    myPurchases: async (root, { user_id }) => {
      const purchaseData = await PurchaseOrder.findAll({
        where: {
          user_id,
        },
      });
      const purchases = await purchaseData.map((Data) =>
        Data.get({ plain: true })
      );
      return purchases;
    },
  },

  Mutation: {
    addUser: async (root, args) => {
      const userData = await User.create(args);
      const user = await userData.get({ plain: true });
      const token = signToken(user);
      return { token, user };
    },

    login: async (root, { email, password }) => {
      const userData = await User.findOne({ where: { email } });
      const user = await userData.get({ plain: true });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await userData.checkPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addPurchase: async (root, { user_id, purchases }) => {
      const purchaseOrderData = await PurchaseOrder.create({ user_id });
      const purchaseOrder = await purchaseOrderData.get({ plain: true });

      const added = purchases.map((arg) => {
        return { ...arg, purchaseOrder_id: purchaseOrder.id };
      });

      const purchasesData = await Purchase.bulkCreate(added);
      const cleanPurchases = await purchasesData.map((Data) =>
        Data.get({ plain: true })
      );
      return { ...purchaseOrder, purchase: cleanPurchases };
    },
    addUserAddress: async (root, { user_id, street, postcode }) => {
      const addressExists = await Address.findOne({
        where: {
          user_id,
        },
      });

      if (!addressExists) {
        const Data = await Address.create({
          user_id,
          street,
          postcode,
        });
      } else {
        const Data = await Address.update(
          { street, postcode },
          { where: { user_id } }
        );
      }

      const userData = await User.findByPk(user_id);
      const user = await userData.get({ plain: true });
      return user;
    },
    removeUserAddress: async (root, { user_id }) => {
      const addressData = await Address.findOne({
        where: {
          user_id,
        },
      });

      await addressData.destroy();

      const userData = await User.findByPk(user_id);
      const user = await userData.get({ plain: true });
      return user;
    },
    editEmail: async (root, { user_id, email }) => {
      await User.update(
        { email },
        {
          where: {
            id: user_id,
          },
        }
      );
      const userData = await User.findByPk(user_id);
      const user = await userData.get({ plain: true });
      return user;
    },
  },
  User: {
    address(parent) {
      return Address.findOne({
        where: {
          user_id: parent.id,
        },
      });
    },
  },
  PurchaseOrder: {
    user_id(parent) {
      return User.findOne({
        where: {
          id: parent.user_id,
        },
      });
    },
    purchases(parent) {
      return Purchase.findAll({
        where: {
          purchaseOrder_id: parent.id,
        },
      });
    },
  },
  Purchase: {
    purchaseOrder_id(parent) {
      return PurchaseOrder.findOne({
        where: {
          id: parent.purchaseOrder_id,
        },
      });
    },
    meal_id(parent) {
      return Meal.findOne({
        where: {
          id: parent.meal_id,
        },
      });
    },
  },
};

module.exports = resolvers;

// School: {
//   classes(parent) {
//     return Class.find({
//       _id: parent.classes,
//     });
//   },
// },
// Class: {
//   professor(parent) {
//     console.log(parent);
//     return Professor.findOne({
//       _id: parent.professor,
//     });
//   },
// },
