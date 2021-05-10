import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found. Try again!`; 
    _successMessage = `Congrats! It's all good`;
    
    _createMarkup() {
        return this._data.map(recipe => previewView.render(recipe, false)).join('');
    }
}

export default new ResultsView();