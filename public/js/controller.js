const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const recipeContainer = document.querySelector('.recipe');

const renderSpinner = function(parentElement){
  const markup = `
      <div class="spinner">
        <svg>
          <use href="../img/icons.svg#icon-loader"></use>
        </svg>
      </div>
  `
  parentElement.insertAdjacentHTML('afterbegin', markup);
}

const showRecipe = async function (){
  try {

    //Loading recipe
    renderSpinner(recipeContainer);

    const res = await fetch(
      //'http://localhost:3000/api/recipes/60899b7c63879f112092fa09'
      'http://localhost:3000/api/recipes/608e735c7b4f6930d8a5e5fa'
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`)
    console.log(res, data);
    let recipe = data;
    recipe = {
      id: recipe._id,
      title: recipe.title,
      typeofFood: recipe.typeofFood,
      publisher: recipe.author,
      image: recipe.imageURL,
      servings: recipe.servings,
      cookingTime: recipe.cookingTime,
      ingredients: recipe.ingredients
    }
    console.log(recipe);
    
    //Rendering recipe
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="../img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="../img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="../img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="../img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="../img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="../img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(ingredient => {
            return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="../img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit}</span>
                  ${ingredient.description}
                </div>
              </li>
            `;
          }).join('')}

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          KetchApp team's chefs. You'll probably love it! 
          Below it's a link to a video where you can see how to cook it.
        </p>
        <a
          class="btn--small recipe__btn"
          href="http://ketchApp.com/team/"
          target="_blank"
        >
          <span>I'll try it</span>
          <svg class="search__icon">
            <use href="../img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
  `;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};
showRecipe();
