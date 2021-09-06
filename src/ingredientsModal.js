import { elements } from './base.js';
import { toggleSignModals as toggleSignModals } from './cart.js';
const createIngredientLi = el => `
  <li class="recipe__item">
    <i class="fas fa-check recipe__icon"></i>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${el}</span>
        
    </div>
  </li>
  `;

export function createIngredientsModel(rec) {
  const [recipe] = rec;
  const markup = `
    <div class="recipe">
      <figure class="recipe__fig">
        <img src="${recipe.imageCover}" alt="${
    recipe.name
  }" class="recipe__img">
        <h1 class="recipe__title">
          <span>${recipe.name}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
          <i class="fas fa-male recipe__info-icon"></i>
          <span class="recipe__info-people">${recipe.cookingTime}</span>
          <span class="recipe__info-text"> min</span>
        </div>
        <div class="recipe-button">
          <button class="recipe__love data-bs-dismiss="modal" value=${
            recipe._id
          } onclick="addToFavorite(this)" style="margin: 5px auto">
            <i class="far fa-heart"></i>
          </button>
          <div class="addToFavorite-message"></div>
        </div>
      </div>

      <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map(el => createIngredientLi(el)).join('')} 
        </ul>
        <button class="btn-small recipe__btn" value=${
          recipe._id
        } onclick="addToCart(this)" data-bs-dismiss="modal">
          <i class="fas fa-cart-plus"></i>
            <span>Add to Cart</span>
        </button>
        <div class="addToCart-message"></div>
        <input class="recipe__amount" type="number" value="1" min="1" step="1" max="100" oninput="changeinput(this)" style="width: 25%; text-align: center">
       
        <button class="btn-small recipe__btn__order" value=${
          recipe._id
        } onclick="orderNowForRecipe(this)" data-bs-dismiss="modal">
        <i class="fas fa-money-bill-wave"></i>
            <span>Order Now</span>
        </button>
      </div>
    </div>

  `;
  elements.ingredientBody.innerHTML = markup;
}

/*  */

export const orderNowForRecipe = recipeBtn => {
  elements.detailsModal.classList.remove('show');
  if (!JSON.parse(localStorage.getItem('user-logged'))) {
    toggleSignModals();
  } else {
    elements.orderModal.classList.add('show__modal');
    localStorage.setItem('recipe-ordered', true);
  }
};

window.orderNowForRecipe = orderNowForRecipe;

const changeinput = inp => {
  if (inp.value === '0' || inp.value === '') inp.value = '1';
  if (Number(inp.value) > 100) inp.value = '100';
};

window.changeinput = changeinput;
