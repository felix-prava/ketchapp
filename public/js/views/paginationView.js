import View from './View.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick (handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn)
                return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }

    _createMarkup(){
        const currentPage = this._data.page;
        const numPages =  Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Just one page
        if (numPages === 1) {
            return ``;
        }

        // Page one of many
        if (currentPage === 1 && numPages > 1) {
            return `
                <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--prev">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="../../img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Middle page
        if (currentPage < numPages) {
            return `
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="../../img/icons.svg#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--prev">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="../../img/icons.svg#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // Last page
        if (currentPage === numPages) {
            return `
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
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