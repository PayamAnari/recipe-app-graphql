import gql from 'graphql-tag';

const recipeTypeDefs = gql`
  type Recipe {
    id: ID
    name: String
    description: String
    createdAt: DateTime
    thumbsUp: Int
    thumbsDown: Int
    creator: User
  }
`;

export default recipeTypeDefs;
