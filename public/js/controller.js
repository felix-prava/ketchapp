import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

const showRecipe = async function (){
  try {
    let recipeID = window.location.hash;
    recipeID = recipeID.slice(1);

    //Check to have a valid id
    if (!recipeID) 
      return;
    recipeView.renderSpinner();

    //Loading recipe
    await model.loadRecipe(recipeID);
    
    //Rendering recipe
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
  recipeView.render(model.state.recipe);
}

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(servingsHandler)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();
