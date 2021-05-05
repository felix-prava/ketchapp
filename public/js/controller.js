import * as model from './model.js';
import recipeView from './views/recipeView.js';

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

showRecipe(); // <- Should be deleted soon

const init = function () {
  recipeView.addHandlerRender(showRecipe);
}
init();
