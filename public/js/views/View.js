export default class View {
    _data;

    render(data) {
        if (!data || data.length === 0)
            return this.renderError();

        this._data = data;
        const markup = this._createMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        this._data = data;
        const newMarkup = this._createMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElments = Array.from(newDOM.querySelectorAll('*'));
        const currentElements = Array.from(this._parentElement.querySelectorAll('*'));
        
        newElments.forEach((newElement, index) => {
            const currentElement = currentElements[index];

            // Update changed text
            if (!newElement.isEqualNode(currentElement) && newElement.firstChild?.nodeValue.trim() !== '') {
                currentElement.textContent = newElement.textContent;
            }

            // Update changed attributes
            if (!newElement.isEqualNode(currentElement)) {
                Array.from(newElement.attributes).forEach(attr => {
                    currentElement.setAttribute(attr.name, attr.value)
                });
            };
        });
    }
 
    _clear(){
        this._parentElement.innerHTML = '';
    }
 
    renderSpinner () {
        const markup = `
            <div class="spinner">
            <svg>
                <use href="../../img/icons.svg#icon-loader"></use>
            </svg>
            </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError (errorMessage = this._errorMessage) {
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
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSuccessMessage (successMessage = this._successMessage) {
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
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}