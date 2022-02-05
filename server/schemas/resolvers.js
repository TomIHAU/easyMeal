const { AuthenticationError } = require("apollo-server-express");
const { Meal, User } = require("../models");
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
  },
};

module.exports = resolvers;
