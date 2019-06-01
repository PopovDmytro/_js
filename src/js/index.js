import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            searchView.renderResults(state.search.result);

            clearLoader();
        } catch (err) {
            alert('Something wrong with the search...');
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
     const btn = e.target.closest('.btn-inline');

     if(btn) {
         const goToPage = parseInt(btn.dataset.goto);
         searchView.clearResults();
         searchView.renderResults(state.search.result, goToPage);
     }
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
    //Get ID from url
    const id = window.location.hash.replace('#', '');

    if(id) {
        // Prepare UI for changes
        recipeView.cleareRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if(state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (e) {
            console.error(e);
        }
    }
};

['hashchange', 'load'].forEach((event) => {
    window.addEventListener(event, controlRecipe);
});

// handling recipe button clicks
elements.recipe.addEventListener('click', (e) => {
   if(e.target.matches('.brn-decrease, .brn-decrease *')) {

        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
   }

    if(e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

});