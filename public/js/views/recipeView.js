//import icons from 'url:../../img/icons.svg'; <-- error here
class RecipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    #errorMessage = `We can't find this recipe. You should try something else!`; 
    #successMessage = `Congrats! It's all good`;
    render(data) { 
        this.#data = data;
        const markup = this.#createMarkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    #clear(){
        this.#parentElement.innerHTML = '';
    }

    renderSpinner () {
        const markup = `
            <div class="spinner">
              <svg>
                <use href="../../img/icons.svg#icon-loader"></use>
              </svg>
            </div>
        `
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
      }

    renderError (errorMessage = this.#errorMessage) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="../../img/icons.svg#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${errorMessage}</p>
        </div>
        `
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSuccessMessage (successMessage = this.#successMessage) {
        const markup = `
        <div class="message">
            <div>
                <svg>
                    <use href="../../img/icons.svg#icon-smile"></use>
                </svg>
            </div>
            <p>${successMessage}</p>
        </div>
        `
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender(handler){
        //Event listener for showing a recipe after selecting it
        window.addEventListener('hashchange', handler);

        //Event listener for showing a recipe after loading a page with one
        window.addEventListener('load', handler);
    }

    #createMarkup() {
        return `
            <figure class="recipe__fig">
                <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
                <h1 class="recipe__title">
                <span>${this.#data.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="../img/icons.svg#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="../img/icons.svg#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
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
                ${this.#data.ingredients.map(ingredient => {
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