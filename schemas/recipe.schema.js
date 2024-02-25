import gql from 'graphql-tag';

const recipeSchema = gql`
  input RecipeInput {
    name: String!
    description: String!
  }

  type NotExistsError {
    message: String!
  }

  union SingleRecipeResult = Recipe | NotExistsError
`;
