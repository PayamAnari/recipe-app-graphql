import gql from 'graphql-tag';

const userSchema = gql`
  input SignUpInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers(total: Int): [User]
    getUserById(id: ID!): User!
  }

  type InvalidCredentialsError {
    message: String!
  }

  type JwtToken {
    token: String!
  }

  type UserWithToken {
    _id: String
    email: String
    firstName: String
    lastName: String
    following: [String]
    createAt: DateTime
    updateAt: DateTime
    userJwtToken: JwtToken
  }

  union LoginResult = UserWithToken | InvalidCredentialsError

  type Mutation {
    signUp(input: SignUpInput!): UserWithToken
    login(input: LoginInput!): LoginResult
  }
`;

export default userSchema;
