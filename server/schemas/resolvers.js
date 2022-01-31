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
  },

  Mutation: {
    addUser: async (root, args) => {
      console.log(args);
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },

    login: async (root, { email, password }) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.checkPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
