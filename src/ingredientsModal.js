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
          <button class="recipe__love" value=${recipe._id}>
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
        } onclick="addToCard(this)">
          <i class="fas fa-cart-plus"></i>
            <span>Add to Cart</span>
        </button>
      </div>
    </div>

  `;
  elements.ingredientBody.innerHTML = markup;
}
export const arrOfIDs = [];
export const addToCart = btn => {
  arrOfIDs.push(btn.value);
  localStorage.setItem('card', JSON.stringify(arrOfIDs));
};

export const createCarts = () => {
  const set = new Set(JSON.parse(localStorage.getItem('card')));
  const carts = [...set];
  console.log(carts);
  const container = document.querySelector('.cart-items');
  container.innerHTML = '';
  if (carts.length > 0) {
    carts.forEach(id => {
      fetch(`https://panda-restaurant.herokuapp.com/api/v1/recipes/?_id=${id}`)
        .then(res => res.json())
        .then(data => {
          const {
            data: {
              data: [recipe],
            },
          } = data;
          createCart(recipe);
        })
        .catch(err => console.log(err));
    });
  }
};
// https://panda-restaurant.herokuapp.com/api/v1/recipes/?_id=6121a4c319e88c0016df150f
export const createCart = recipe => {
  const cart = `

  <div class="row">
    <div class="col-8 cart-content">
      <h3>${recipe.name}</h3>
      <div class="summary">
        <span class="price">${recipe.price}$</span>
        <select class="amount" value="amount">
          <option value="1">x 1</option>
          <option value="2">x 2</option>
          <option value="3">x 3</option>
          <option value="4">x 4</option>
          <option value="5">x 5</option>
          <option value="6">x 6</option>
          <option value="7">x 7</option>
          <option value="8">x 8</option>
          <option value="9">x 9</option>
          <option value="10">x 10</option>
        </select>
      </div>
    </div>
    <div class="col-4">
      <img class="pic" src=${recipe.imageCover} />
    </div>
  </div>

  `;
  const cartItem = document.createElement('li');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = cart;
  const container = document.querySelector('.cart-items');
  container.appendChild(cartItem);
};

/*  */
