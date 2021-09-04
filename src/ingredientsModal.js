import { elements } from './base.js';

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
          } onclick="addToFavorite(this)">
            <i class="far fa-heart"></i>
          </button>
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
      </div>
    </div>

  `;
  elements.ingredientBody.innerHTML = markup;
}

/*  */
