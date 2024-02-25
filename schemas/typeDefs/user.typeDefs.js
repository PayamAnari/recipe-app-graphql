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
    createAt: DateTime
    updateAt: DateTime
  }
`;

export default userTypeDefs;
