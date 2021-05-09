import View from './View.js';

//import icons from 'url:../../img/icons.svg'; <-- error here
class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    _createMarkup(){
        const currentPage = this._data.page;
        const numPages =  Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Just one page
        if (numPages === 1) {
            console.log("1");
            return ``;
        }

        // Page one of many
        if (currentPage === 1 && numPages > 1) {
            console.log("2");
            return `
            <button class="btn--inline pagination__btn--prev">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="../../img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Middle page
        if (currentPage < numPages) {
            console.log("3");
            return `
                <button class="btn--inline pagination__btn--prev">
                    <span>Page ${currentPage - 1}</span>
                    <svg class="search__icon">
                        <use href="../../img/icons.svg#icon-arrow-left"></use>
                    </svg>
                </button>
                <button class="btn--inline pagination__btn--prev">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="../../img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Last page
        if (currentPage === numPages) {
            console.log("4");
            return `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="../../img/icons.svg#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `;
        }
        
    }
}

export default new PaginationView();