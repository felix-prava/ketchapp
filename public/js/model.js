import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './helpers.js';
import recipeView from './views/recipeView.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    favourites: [],
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

        if (state.favourites.some(favourite => favourite.id === recipeID)) {
            state.recipe.favourite = true;
        } else {
            state.recipe.favourite = false;
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
        state.search.page = 1;
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

export const updateServings = function (newServings) {
    const oldServings = state.recipe.servings;
    state.recipe.ingredients.forEach(ingredient => {
        const oldQuantity = ingredient.quantity;
        ingredient.quantity = oldQuantity * newServings / oldServings;
    });
    state.recipe.servings = newServings;
};

const persistFavourites = function (recipe) {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
}

export const addFavourite = function (recipe) {
    // Add a favourite recipe
    state.favourites.push(recipe);

    // Mark the recipe as a favourite
    if (recipe.id === state.recipe.id) {
        state.recipe.favourite = true;
    }

    persistFavourites();
};

export const deleteFavourite = function (recipeID) {
    // Delete favourite
    const index = state.favourites.findIndex(element => element.id === recipeID);
    state.favourites.splice(index, 1);

    // Mark the recipe as NOT a favourite
    if (recipeID === state.recipe.id) {
        state.recipe.favourite = false;
    }

    persistFavourites();
};

const init = function (){
    const storage = localStorage.getItem('favourites');
    if (storage)
        state.favourites = JSON.parse(storage);
};
init();

const clearFavourites = function () {
    localStorage.clear('favourites');
}

export const uploadRecipe = async function (newRecipe) {
    try { 
        // Take the valid ingredients
        const ingredients = Object.entries(newRecipe).filter(entry =>
            entry[0].startsWith('ingredient') && entry[1] !== ''
        ).map(ingredient => {
            const ingredientArray = ingredient[1].trim().split(',');
            if (ingredientArray.length !== 3)
                throw new Error('Wrong ingredient format!')
            const [quantity, unit, description] = ingredientArray;
            return { quantity: quantity ? +quantity : null, unit, description };
        });
        const recipe = {
            author: newRecipe.author,
            ingredients: ingredients,
            imageURL: newRecipe.imageURL,
            title: newRecipe.title,
            servings: +newRecipe.servings,
            cookingTime: newRecipe.cookingTime,
            typeofFood: newRecipe.typeofFood
        }
        console.log(recipe);
        const data = await sendJSON(`${API_URL}`, recipe);
        console.log(data);
    } catch (e) {
        throw e;
    }
};
