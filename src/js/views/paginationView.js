import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const nextButton = `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    const prevButton = `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextButton;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return prevButton;
    }
    // Any other page
    if (curPage < numPages) {
      //   return `${prevButton} ${nextButton}`;  // one method
      return [prevButton, nextButton]; //2nd method
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
