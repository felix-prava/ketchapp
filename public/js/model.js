import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
import recipeView from './views/recipeView.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
};

export const loadRecipe = async function(recipeID) {
    try{
        const data = await getJSON(`${API_URL}/${recipeID}`)

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
        console.log(err);
        throw err;
    }
};

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        const recipes = await getJSON(`${API_URL}/searchResults?typeofFood=${query}`);

        state.search.results = recipes.map(recipe => {
            return {
                id: recipe._id,
                title: recipe.title,
                publisher: recipe.author,
                image: recipe.imageURL
            };
        });
    } catch(err){
        console.log(err);
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {

    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage; // 0
    const end = page * state.search.resultsPerPage; // 9

    return state.search.results.slice(start, end);
  };