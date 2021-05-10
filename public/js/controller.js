import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import favouritesView from './views/favouritesView.js';
import addRecipeView from './views/addRecipeView.js';

const showRecipe = async function (){
  try {
    let recipeID = window.location.hash;
    recipeID = recipeID.slice(1);

    // Check to have a valid id
    if (!recipeID) 
      return;
    recipeView.renderSpinner();

    // Update results view to mark selected recipe
    resultsView.update(model.getSearchResultsPage());

    // Update favourites view
    favouritesView.update(model.state.favourites);

    // Loading recipe
    await model.loadRecipe(recipeID);
    
    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    // Get the search qyery
    const query = searchView.getQuery();
    if (!query)
      return;
    
    // Load the model state with the types of food
    await model.loadSearchResults(query);
    // After that render them
    resultsView.render(model.getSearchResultsPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render the new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render the new pagination buttons
  paginationView.render(model.state.search);
}

const servingsHandler = function (newServings) {
  // Update the recipe sevings
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddFavourite = function () {
  // Add/remove a favourite recipe
  if (!model.state.recipe.favourite)
    model.addFavourite(model.state.recipe);
  else
    model.deleteFavourite(model.state.recipe.id);
    
  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render favourites recipes
  favouritesView.render(model.state.favourites);
}

const controlFavourites = function () {
  favouritesView.render(model.state.favourites);
}

const controlAddRecipe = function (newRecipe) {
  // Add the new recipe in the DB
  console.log(newRecipe);
}

const init = function () {
  favouritesView.addHandlerRender(controlFavourites);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(servingsHandler);
  recipeView.addHandlerAddFavourite(controlAddFavourite);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
