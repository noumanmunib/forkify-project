import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const { mark, async } = require('regenerator-runtime');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 2) Updating the bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 3) Loading Recipe
    await model.loadRecipe(id);

    // 4) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination button:
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render initial pagination button:
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  // 1) Add or remove boookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update bookmark
  recipeView.update(model.state.recipe);

  // 3) Render bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show a loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bokmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('👎', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRenderer(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

/////////////////////////////////////////////////
/*
// Practicing Project: Forkify

import * as model2 from './model2.js';
import recipeView2 from './views/recipeView2.js';
import searchView2 from './views/searchView2.js';
import resultsView2 from './views/resultsView2.js';
import paginationView2 from './views/paginationView2.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const { mark } = require('regenerator-runtime');

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView2.renderSpinner();

    // 1) Loading Recipe:
    await model2.loadRecipe(id);

    // 2) Rendering Recipe:
    recipeView2.render(model2.state.recipe);
  } catch (err) {
    recipeView2.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView2.renderSpinner();

    // 1) Get search query
    const query = searchView2.getQuery();
    if (!query) return;

    // 2) load search results
    await model2.loadSearchResults(query);

    // 3) Render results
    // resultsView2.render(model2.state.search.results);
    resultsView2.render(model2.getSearchResultsPage());

    // 4) Render initial pagination buttons:
    paginationView2.render(model2.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render results
  resultsView2.render(model2.getSearchResultsPage(goToPage));

  // 2) Render final pagination buttons:
  paginationView2.render(model2.state.search);
};

const init = function () {
  recipeView2.addHandlerRender(controlRecipes);
  searchView2.addHandlerSearch(controlSearchResults);
  paginationView2.addHandlerClick(controlPagination);
};
init();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
*/
