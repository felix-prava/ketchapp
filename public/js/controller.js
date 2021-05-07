import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

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
    // Get the search qyery
    const query = searchView.getQuery();
    if (!query)
      return;
    
    // Load the model state with the types of food
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
