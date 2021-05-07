import View from './View.js';

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found. Try again!`; 
    _successMessage = `Congrats! It's all good`;
    
    _createMarkup() {
        return this._data.map(this._generateMarkupPreview).join('')
        
    }

    _generateMarkupPreview(recipe) {
        return `
            <li class="preview">
                <a class="preview__link preview__link--active" href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src="${recipe.image}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                </div>
                </a>
            </li>
        `;
    }
}

export default new ResultsView();