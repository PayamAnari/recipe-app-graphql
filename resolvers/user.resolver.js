import UserModel from '../models/user.model.js';
import UserHelper from '../helpers`/user.helper.js';
import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';
import { GraphQLError } from 'graphql';

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
  },
};
