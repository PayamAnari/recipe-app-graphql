import UserModel from '../models/user.model.js';
import userHelper from '../helpers/user.helper.js';
import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';
import { GraphQLError } from 'graphql';
import RecipeModel from '../models/recipe.model.js';

const userResolver = {
  Query: {
    getUsers: async (_, { total }, contextValue) => {
      try {
        const users = await UserModel.find()
          .sort({ createdAt: -1 })
          .limit(total)
          .populate('recipes');

        const usersWithRecipes = await Promise.all(
          users.map(async (user) => {
            const recipes = await RecipeModel.find({ creator: user._id });
            return {
              ...user._doc,
              recipes: recipes,
            };
          }),
        );
        return usersWithRecipes;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getUserById: async (_, { id }, contextValue) => {
      try {
        const user = await UserModel.findById(id);
        if (!user) {
          throwCustomError(
            `User with id ${id} does not exist.`,
            ErrorTypes.NOT_FOUND,
          );
        }

        const recipes = await RecipeModel.find({ creator: id });

        return {
          ...user._doc,
          recipes: recipes.map((recipe) => ({
            ...recipe._doc,
            creator: user,
          })),
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const { email, password, firstName, lastName } = input;
      const isUserExists = await userHelper.isEmailAlreadyExists(email);
      if (isUserExists) {
        throwCustomError(
          'Email is already Registered',
          ErrorTypes.ALREADY_EXISTS,
        );
      }
      const userToCreate = new UserModel({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        following: [],
      });
      const user = await userToCreate.save();
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: process.env.TOKEN_EXPIRY_TIME },
      );

      return {
        __typename: 'UserWithToken',
        ...user._doc,
        userJwtToken: {
          token: token,
        },
      };
    },

    login: async (_, { input: { email, password } }, context) => {
      const user = await UserModel.findOne({
        $and: [{ email: email }, { password: password }],
      });
      if (user) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_PRIVATE_KEY,
          { expiresIn: process.env.TOKEN_EXPIRY_TIME },
        );
        return {
          ...user._doc,
          userJwtToken: {
            token: token,
          },
        };
      }
      throwCustomError(
        'Invalid email or password provided.',
        ErrorTypes.BAD_USER_INPUT,
      );
    },
  },
};

export default userResolver;
