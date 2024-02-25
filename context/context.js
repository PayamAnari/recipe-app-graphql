import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes, 
} from '../helpers/error-handler.helper.js';

const getUser = async (token) => {
  try {
    if(token) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user;
    }

  } catch (error) {
    return null
  }
}