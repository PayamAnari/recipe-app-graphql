import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';

const getUser = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const context = async ({ req, res }) => {
  if (req.body.operationName === 'IntrospectionQuery') {
    return {};
  }

  // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
  if (
    req.body.operationName === 'CreateUser' ||
    req.body.operationName === 'Login'
  ) {
    return {};
  }

  // get the token from the request headers
  const token = req.headers.authorization || '';

  // try tp retrieve a user with the token
  const user = await getUser(token);

  // if the user is not found, throw an error
  if (!user) {
    throwCustomError('User is not authenticated', ErrorTypes.UNAUTHORIZED);
  }

  // add the user to the context
  return { user };
};

export default context;
