import RecipeModel from '../models/recipe.model.js';
import RecipeHelper from '../helpers/recipe.helper.js';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';

const recipeResolver = {
  Query: {
    recipe: async (parent, { id }, contextValue) => {
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
        throwCustomError(
          `Recipe with id ${id} does not exists.`,
          ErrorTypes.NOT_FOUND,
        );
      }
      return {
        id: recipe._id,
        ...recipe._doc,
      };
    },

    async getRecipes(parent, args, contextValue) {
      const amount = args.amount;
      const allRecipes = await RecipeModel.find()
        .sort({ createAt: -1 })
        .limit(amount);
      return allRecipes;
    },
  },

  Mutation: {
    createRecipe: async (
      parent,
      { recipeInput: { name, description } },
      contextValue,
    ) => {
      const createdRecipe = new RecipeModel({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });
      const res = await createRecipe.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
  },

  deleteRecipe: async (_, { id }, contextValue) => {
    const isExists = await RecipeModel.isRecipeExists(id);
    if (!isExists) {
      throwCustomError(
        `Recipe with id ${id} does not exists.`,
        ErrorTypes.NOT_FOUND,
      );
    }
    const isDeleted = (await RecipeModel.deleteOne({ _id: id })).deletedCount;
    return {
      isSuccess: isDeleted,
      message: 'Recipe deleted successfully.',
    };
  },
};
