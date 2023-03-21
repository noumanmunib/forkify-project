/*
import View2 from './View2.js';
import icons from 'url:../../img/icons.svg';

class ResultsView2 extends View2 {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Unable to find any recipe, please try again.`;
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    <div class="preview__user-generated">
                    </div>
                </div>
            </a>
        </li>
    `;
  }
}

export default new ResultsView2();
*/
