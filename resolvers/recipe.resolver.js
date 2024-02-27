import RecipeModel from '../models/recipe.model.js';
import RecipeHelper from '../helpers/recipe.helper.js';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';
import UserModel from '../models/user.model.js';

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
        .sort({ createdAt: -1 })
        .limit(amount);
      return allRecipes;
    },
  },

  Mutation: {
    createRecipe: async (
      parent,
      { recipeInput: { name, description, creatorId } },
    ) => {
      const creator = await UserModel.findById(creatorId);
      if (!creator) {
        throwCustomError('Creator not found.', ErrorTypes.NOT_FOUND);
      }

      const createdRecipe = new RecipeModel({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
        creator: creatorId,
      });
      const res = await createdRecipe.save();

      await UserModel.findByIdAndUpdate(creatorId, {
        $push: { recipes: res._id },
      });

      return {
        id: res.id,
        ...res._doc,
        creator: creator,
      };
    },

    deleteRecipe: async (_, { id }, contextValue) => {
      const isExists = await RecipeHelper.isRecipeExists(id);
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

    editRecipe: async (
      _,
      { id, recipeInput: { name, description }, contextValue },
    ) => {
      const isExists = await RecipeHelper.isRecipeExists(id);
      if (!isExists) {
        throwCustomError(
          `Recipe with id ${id} does not exists.`,
          ErrorTypes.NOT_FOUND,
        );
      }
      const isEdited = (
        await RecipeModel.updateOne(
          { _id: id },
          { name: name, description: description },
        )
      ).modifiedCount;
      return {
        isSuccess: isEdited,
        message: 'Recipe updated successfully.',
      };
    },

    incrementThumbsUp: async (_, { id }, contextValue) => {
      const isExists = await RecipeHelper.isRecipeExists(id);
      if (!isExists) {
        throwCustomError(
          `Recipe with id ${id} does not exists.`,
          ErrorTypes.NOT_FOUND,
        );
      }
      await RecipeModel.findByIdAndUpdate(
        { _id: id },
        {
          $inc: { thumbsUp: 1 },
        },
        { new: true },
      );

      return {
        isSuccess: true,
        message: 'Thumbs up incremented successfully.',
      };
    },

    incrementThumbsDown: async (_, { id }, contextValue) => {
      const isExists = await RecipeHelper.isRecipeExists(id);
      if (!isExists) {
        throwCustomError(
          `Recipe with id ${id} does not exists.`,
          ErrorTypes.NOT_FOUND,
        );
      }
      await RecipeModel.findByIdAndUpdate(
        { _id: id },
        {
          $inc: { thumbsDown: 1 },
        },
        { new: true },
      );

      return {
        isSuccess: true,
        message: 'Thumbs down incremented successfully.',
      };
    },
  },
};

export default recipeResolver;
