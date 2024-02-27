import gql from 'graphql-tag';

const userTypeDefs = gql`
  scalar DateTime

  type User {
    _id: String
    email: String
    password: String
    firstName: String
    lastName: String
    following: [String]
    createdAt: DateTime
    updatedAt: DateTime
    recipes: [Recipe]
  }
`;

export default userTypeDefs;
