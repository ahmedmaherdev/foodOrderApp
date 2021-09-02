import { elements } from './base.js';

export const arrOfIDs = [];
export const addToCart = btn => {
  if (!JSON.parse(localStorage.getItem('user-logged'))) {
    elements.detailsModal.classList.remove('show');
    toggleSignModals();
  } else {
    arrOfIDs.push(btn.value);
    localStorage.setItem('card', JSON.stringify(arrOfIDs));
  }
};

export const createCarts = () => {
  const set = new Set(JSON.parse(localStorage.getItem('card')));
  const carts = [...set];
  const container = elements.cartModal.querySelector('.cart-items');
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
      <div class="hidden id">${recipe._id}</div>
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

function openSignUModal() {
  elements.signupModal.classList.add('show__modal');
}

// for toggle signup an sign in
function toggleSignModals() {
  if (elements.signupModal.classList.contains('show__modal')) {
    elements.signupModal.classList.remove('show__modal');
    elements.signinModal.classList.add('show__modal');
  } else {
    elements.signupModal.classList.add('show__modal');
    elements.signinModal.classList.remove('show__modal');
  }
}

window.openSignUModal = openSignUModal;
window.toggleSignModals = toggleSignModals;
