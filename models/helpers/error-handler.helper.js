import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphqlError } from 'graphql';

export const ErrorTypes = {
  BAD_USER_INPUT: {
    errorMessage: 'The input provided is invalid.',
    errorCode: ApolloServerErrorCode.BAD_USER_INPUT,
    errorStatus: 400,
  },
  BAD_REQUEST: {
    errorMessage: 'The request is invalid.',
    errorCode: ApolloServerErrorCode.BAD_REQUEST,
    errorStatus: 400,
  },
};
