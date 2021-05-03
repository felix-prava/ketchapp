import * as model from './model.js';
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



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
    alert(err);
  }
};
showRecipe();

//Event listener for showing a recipe after selecting it
window.addEventListener('hashchange', showRecipe);

//Event listener for showing a recipe after loading a page with one
window.addEventListener('load', showRecipe);
