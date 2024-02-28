import RecipeModel from '../models/recipe.model.js';
import RecipeHelper from '../helpers/recipe.helper.js';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';
import UserModel from '../models/user.model.js';

const recipeResolver = {
  Query: {
    recipe: async (parent, { id }, contextValue) => {
      const recipe = await RecipeModel.findById(id).populate('creator');
      if (!recipe) {
        throwCustomError(
          `Recipe with id ${id} does not exists.`,
          ErrorTypes.NOT_FOUND,
        );
      }
      return {
        id: recipe._id,
        ...recipe._doc,
        creator: recipe.creator,
      };
    },

    async getRecipes(parent, args, contextValue) {
      const amount = args.amount;
      const allRecipes = await RecipeModel.find()
        .sort({ createdAt: -1 })
        .limit(amount)
        .populate('creator');
      return allRecipes.map((recipe) => ({
        id: recipe._id,
        ...recipe._doc,
        creator: recipe.creator,
      }));
    },
  },

  Mutation: {
    createRecipe: async (
      parent,
      { recipeInput: { name, description, creatorId }, contextValue },
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

    deleteRecipe: async (_, { id }, context) => {
      console.log(context);
      const userId = context.user.userId;

      if (!userId) {
        throwCustomError(
          'You are not authorized to delete this recipe.',
          ErrorTypes.UNAUTHORIZED,
        );
      }
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
        throwCustomError(
          `Recipe with id ${id} does not exist.`,
          ErrorTypes.NOT_FOUND,
        );
      }

      if (userId !== recipe.creator.toString()) {
        throwCustomError(
          'You are not authorized to delete this recipe.',
          ErrorTypes.UNAUTHORIZED,
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
      { id, recipeInputUpdate: { name, description } },
      context,
    ) => {
      const userId = context.user.userId;

      if (!userId) {
        throwCustomError(
          'You are not authorized to edit this recipe.',
          ErrorTypes.UNAUTHORIZED,
        );
      }
      const recipe = await RecipeModel.findById(id);
      if (!recipe) {
        throwCustomError(
          `Recipe with id ${id} does not exist.`,
          ErrorTypes.NOT_FOUND,
        );
      }
      if (userId !== recipe.creator.toString()) {
        throwCustomError(
          'You are not authorized to edit this recipe.',
          ErrorTypes.UNAUTHORIZED,
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
