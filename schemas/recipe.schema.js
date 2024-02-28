import gql from 'graphql-tag';

const recipeSchema = gql`
  input RecipeInput {
    name: String!
    description: String!
    creatorId: ID!
  }

  input RecipeInputUpdate {
    name: String!
    description: String!
  }

  # union SingleRecipeResult = Recipe | NotExistsError

  type Query {
    recipe(id: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
  }

  type RecipeSuccess {
    isSuccess: Boolean
    message: String
  }

  # union RecipeResult = RecipeSuccess | NotExistsError

  type Mutation {
    createRecipe(recipeInput: RecipeInput!): Recipe!
    deleteRecipe(id: ID!): RecipeSuccess
    editRecipe(id: ID!, recipeInputUpdate: RecipeInputUpdate): RecipeSuccess
    incrementThumbsUp(id: ID!): RecipeSuccess
    incrementThumbsDown(id: ID!): RecipeSuccess
  }
`;

export default recipeSchema;
