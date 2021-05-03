import { API_URL } from './config.js';
import { getJSON } from './helpers.js'
export const state = {
    recipe: {},
};

export const loadRecipe = async function(recipeID) {
    try{
        const data = await getJSON(`${API_URL}/${recipeID}`);
        
        let recipe = data;
        state.recipe = {
            id: recipe._id,
            title: recipe.title,
            typeofFood: recipe.typeofFood,
            publisher: recipe.author,
            image: recipe.imageURL,
            servings: recipe.servings,
            cookingTime: recipe.cookingTime,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe);
    } catch(err){
        alert(err);
    }
}