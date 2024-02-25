import gql from 'graphql-tag';

const recipeTypeDefs = gql`
  type Recipe {
    id: ID
    name: String
    description: String
    createAt: String
    thumbsUp: Int
    thumbsDown: Int
  }
`;

export default recipeTypeDefs;
