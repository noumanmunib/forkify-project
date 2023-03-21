/*
import View2 from './View2.js';
import icons from 'url:../../img/icons.svg';

class PaginationView2 extends View2 {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    const curPage = this._data.page;

    const prevBtn = `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;

    const nextBtn = `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;

    // Page 1, other pages exist
    if (curPage === 1 && numPages > 1) {
      return nextBtn;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return prevBtn;
    }
    // Other page
    if (curPage < numPages) {
      return [prevBtn, nextBtn];
    }
    // Page 1, No other pages exist
    return '';
  }
}

export default new PaginationView2();
*/
