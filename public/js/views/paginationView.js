import View from './View.js';

//import icons from 'url:../../img/icons.svg'; <-- error here
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    _createMarkup(){
       const numPages =  this._data.results.length / this._data.resultsPerPage;

       console.log(numPages);
    }
}

export default new PaginationView();