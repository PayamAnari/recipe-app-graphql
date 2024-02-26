import UserModel from '../models/user.model.js';
import UserHelper from '../helpers`/user.helper.js';
import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';
import { GraphQLError } from 'graphql';
import userHelper from '../helpers/user.helper';

const userResolver = {
  Query: {
    getUsers: async (_, { total }, contextValue) => {
      try {
        const users = await UserModel.find()
          .sort({ createdAt: -1 })
          .limit(total);
        return users;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getUserById: async (_, { id }, contextValue) => {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const { name, password, firstName, lastName } = input;
      const isUserExists = await userHelper.isEmailAlreadyExists(email);
      if (isUserExists) {
        throwCustomError(
          'Email is already Registerd',
          ErrorTypes.ALREADY_EXISTS,
        );
      }
    },
  },
};
