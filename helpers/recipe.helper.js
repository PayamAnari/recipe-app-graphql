import RecipeModel from '../models/recipe.model.js';

const RecipeHelper = {
  isRecipeExists: async (id) => {
    const recipe = await RecipeModel.findById(id);
    return recipe ? true : false;
  },
};

export default RecipeHelper;
