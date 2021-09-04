import { elements } from './base.js';
export const arrfavoriteIDs =
  JSON.parse(localStorage.getItem('favorite')) || [];
export const addToFavorite = btn => {
  if (!JSON.parse(localStorage.getItem('user-logged'))) {
    elements.detailsModal.classList.remove('show');
    toggleSignModals();
  } else {
    if (!arrfavoriteIDs.includes(btn.value)) arrfavoriteIDs.push(btn.value);
    localStorage.setItem('favorite', JSON.stringify(arrfavoriteIDs));
  }
};

export const createFavorites = () => {
  const set = new Set(JSON.parse(localStorage.getItem('favorite')));
  const favorites = [...set];
  const container = document.querySelector('.favorite-items');
  container.innerHTML = '';
  if (favorites.length > 0) {
    favorites.forEach(id => {
      fetch(`https://panda-restaurant.herokuapp.com/api/v1/recipes/?_id=${id}`)
        .then(res => res.json())
        .then(data => {
          const {
            data: {
              data: [recipe],
            },
          } = data;
          createFavorite(recipe);
        })
        .catch(err => console.log(err));
    });
  }
};
// https://panda-restaurant.herokuapp.com/api/v1/recipes/?_id=6121a4c319e88c0016df150f
export const createFavorite = recipe => {
  const cart = `

  <div class="row">
    <div class="col-8 cart-content">
      <h3>${recipe.name}  <span>❤️</span></h3>
     
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
  const container = document.querySelector('.favorite-items');
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
