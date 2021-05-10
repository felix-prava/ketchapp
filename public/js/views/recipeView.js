import View from './View.js';

//import icons from 'url:../../img/icons.svg'; <-- error here
class RecipeView extends View{
    _parentElement = document.querySelector('.recipe');
    _errorMessage = `We can't find this recipe. You should try something else!`; 
    _successMessage = `Congrats! It's all good`;

    addHandlerRender(handler) {
        //Event listener for showing a recipe after selecting it
        window.addEventListener('hashchange', handler);

        //Event listener for showing a recipe after loading a page with one
        window.addEventListener('load', handler);
    }

    addHandlerUpdateServings (handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn)
                return;
            const updateTo = +btn.dataset.updateTo;

            // Update the recipe for the new number of servings
            if (updateTo > 0)
                handler(updateTo);
        });
    }

    addHandlerAddFavourite (handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--favourite');
            if (!btn)
                return;
            handler();
        })
    }

    _createMarkup() {
        const currentServings = this._data.servings;
        return `
            <figure class="recipe__fig">
                <img src="${this._data.imageURL}" alt="${this._data.title}" class="recipe__img" />
                <h1 class="recipe__title">
                <span>${this._data.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="../img/icons.svg#icon-clock"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                    <span class="recipe__info-text">minutes</span>
                </div>

                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="../img/icons.svg#icon-users"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${currentServings}</span>
                    <span class="recipe__info-text">servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn--tiny btn--update-servings" data-update-to="${currentServings - 1}">
                            <svg>
                                <use href="../img/icons.svg#icon-minus-circle"></use>
                            </svg>
                        </button>
                        <button class="btn--tiny btn--update-servings" data-update-to="${currentServings + 1}">
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
                <button class="btn--round btn--favourite">
                    <svg class="">
                        <use href="../img/icons.svg#icon-bookmark${this._data.favourite ? '-fill' : ''}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                ${this._data.ingredients.map(ingredient => {
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
    }
}

export default new RecipeView();