import View from './View.js';
import previewView from './previewView.js';

class FavouritesView extends View{
    _parentElement = document.querySelector('.favourites__list');
    _errorMessage = `No favourites yet. Find a nice recipe and add it to your list!`; 
    _successMessage = `Congrats! It's all good`;

    addHandlerRender (handler) {
        window.addEventListener('load', handler);
    }
    
    _createMarkup() {
        return this._data.map(favourite => previewView.render(favourite, false)).join('');
    }
}

export default new FavouritesView();