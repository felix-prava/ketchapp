import View from './View.js';

class AddRecipeView extends View{
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _openBtn = document.querySelector('.nav__btn--add-recipe');
    _closeBtn = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() { 
        this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
    };

    _addHandlerHideWindow() { 
        this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    };

    _createMarkup() {
    };

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataToArray = [...new FormData(this)];
            const data = Object.fromEntries(dataToArray);
            handler(data);
        });
    };
}

export default new AddRecipeView();