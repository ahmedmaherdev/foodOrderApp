'use strict';

import { elements as elements } from './base.js';
import { createRecipe as createRecipe } from './createRecipe.js';
import { createIngredientsModel as createIngredientsModel } from './ingredientsModal.js';
import { searchOnClick, searchOnClickLink } from './searchActions.js';
import { signin, signup, logged, signout } from './form.js';
import { addToCart, createCarts, putTotalSalary } from './cart.js';
import { addToFavorite, createFavorites } from './favorite.js';
import { postOrder, closeModalResult } from './order.js';
import { getOrdersBtn, getOrders, orderCancel } from './getOrders.js';
const searchTarget = document.querySelector('.search-target');
let searchWord = localStorage.getItem('search-target');

searchTarget.textContent = `You search about: ${searchWord}`;

// add to card

// logged
logged();

// get Orders
getOrdersBtn.addEventListener('click', getOrders);
window.orderCancel = orderCancel;
// add to card
window.addToCart = addToCart;
const cartBtn = document.getElementById('cart-open');
cartBtn.addEventListener('click', () => {
  createCarts();
  putTotalSalary();
});

// close result order
const closeOrderResultBtns = document.querySelectorAll(
  '#orderResultModal .close'
);
closeOrderResultBtns.forEach(btn =>
  btn.addEventListener('click', () =>
    closeModalResult(elements.orderResultModal)
  )
);

// close cancel modal result
const closeCancelModalBtns =
  elements.orderCancelModal.querySelectorAll('.close');
closeCancelModalBtns.forEach(btn =>
  btn.addEventListener('click', () =>
    closeModalResult(elements.orderCancelModal)
  )
);

//////////////////////////////////////////////////////////////////////

// add to favorite
window.addToFavorite = addToFavorite;
const favoriteBtn = document.querySelector('.favorite-open');
favoriteBtn.addEventListener('click', createFavorites);

//////////////////////////////////////////////////////////////////////

// make order
elements.orderNowBtn.addEventListener('click', () => {
  postOrder();
});

elements.signup.addEventListener('click', () => {
  elements.signupModal.classList.add('show__modal');
});

elements.signin.addEventListener('click', () => {
  elements.signinModal.classList.add('show__modal');
});

//show modal
elements.orderNow.addEventListener('click', () => {
  if (JSON.parse(localStorage.getItem('card')).length > 0)
    elements.orderModal.classList.add('show__modal');
});

//hide modal
elements.closeSignup.addEventListener('click', () => {
  elements.signupModal.classList.remove('show__modal');
});

elements.closeSignin.addEventListener('click', () => {
  elements.signinModal.classList.remove('show__modal');
});

//hide modal outside  click
window.addEventListener('click', e => {
  e.target == elements.signupModal
    ? elements.signupModal.classList.remove('show__modal')
    : false;
  e.target == elements.signinModal
    ? elements.signinModal.classList.remove('show__modal')
    : false;
  e.target == elements.orderModal
    ? elements.orderModal.classList.remove('show__modal')
    : false;
  suggestions.innerHTML = '';
  e.target == elements.orderCancelModal
    ? closeModalResult(elements.orderCancelModal)
    : false;
  e.target == elements.orderResultModal
    ? closeModalResult(elements.orderResultModal)
    : false;
  if (!elements.orderModal.classList.contains('show__modal'))
    localStorage.setItem('recipe-ordered', false);
});

//hide details  modal
elements.closeDetailsModal.forEach(value => {
  value.addEventListener('click', () => {
    elements.detailsModal.classList.remove('show');
  });
});

//hide details  modal outside  click
window.addEventListener('click', e => {
  e.target == elements.detailsModal
    ? elements.detailsModal.classList.remove('show')
    : false;
});

//show ingredients details modal****************************

//////////////////////////////////////////////////////////////////////
// search section
const search = document.querySelector('.search-label');
const suggestions = document.querySelector('.suggestions');
const searchOnChangeSearchPage = async () => {
  if (search.value) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    await fetch(
      `https://panda-restaurant.herokuapp.com/api/v1/recipes/search?s=${search.value}`,
      requestOptions
    )
      .then(res => res.json())
      .then(data => {
        const {
          data: { data: arr },
        } = data;
        if (arr.length) {
          suggestions.innerHTML = '';
          arr.forEach(val => {
            suggestions.style = 'padding: 5px;';
            const suggest = document.createElement('li');
            suggest.innerHTML = `<a href="./search.html?search=${val.name}" onclick="searchOnClickLink(this.textContent)">${val.name}</a>`;
            suggestions.prepend(suggest);
          });
        }
      })
      .catch(error => console.log('error', error));
  }
};
window.searchOnChangeSearchPage = searchOnChangeSearchPage;
window.searchOnClickLink = searchOnClickLink;

const clearSuggestions = () => {
  suggestions.querySelectorAll('li').forEach(val => {
    val.remove();
  });
  suggestions.style = ' padding: 0px';
};

// search btn
const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', () => {
  searchOnClick('./search.html');
});

search.addEventListener('input', searchOnChangeSearchPage);

// add Enter Event to search input

search.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    searchOnClick('./search.html');
  }
});

const recipes = elements.recipeContainer;

// function create search target content
const searchTargetContent = async search => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  await fetch(
    `https://panda-restaurant.herokuapp.com/api/v1/recipes/search?s=${search}`,
    requestOptions
  )
    .then(res => res.json())
    .then(data => {
      const {
        data: { data: arr },
      } = data;
      arr.forEach(res => {
        createRecipe(recipes, res);
      });
    });
};
searchTargetContent(searchWord);
// End Search section
/////////////////////////////////////////////////////////////////////

const makemodalVisible = async card => {
  await fetch(
    `https://panda-restaurant.herokuapp.com/api/v1/recipes/?name=${
      card.querySelector('.recipe-name').textContent
    }`
  )
    .then(res => res.json())
    .then(data => {
      const {
        data: { data: rec },
      } = data;
      elements.detailsModal.classList.add('show');
      createIngredientsModel(rec);
    });
};

window.makemodalVisible = makemodalVisible;
// form validation

// password confirmation
elements.profileBtn.addEventListener('click', () => {
  //  await getUser(token)
  const url = './profile.html';
  window.location = `${url}`;
});
//handle add to card button
// localStorage.removeItem('logged', true);
function handleAddToCartBtn() {
  if (localStorage.getItem('logged')) {
    console.log('item added to cart');
  } else {
    toggleSignModals();
  }
}

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
window.handleAddToCartBtn = handleAddToCartBtn;

//////////////////////////////////////////////////////////

//   sign in

signin.submitBtn.addEventListener('click', signin.postSignin);
signin.email.addEventListener('input', signin.validEmail);
signin.password.addEventListener('input', signin.validPassword);
signin.email.addEventListener('keyup', e => {
  if (e.key === 'Enter') signin.postSignin();
});
signin.password.addEventListener('keyup', e => {
  if (e.key === 'Enter') signin.postSignin();
});
//  sign up
signup.submitBtn.addEventListener('click', signup.postSignup);
signup.email.addEventListener('input', signup.validEmail);
signup.password.addEventListener('input', signup.validPassword);
signup.name.addEventListener('input', signup.validName);
signup.passwordConfirm.addEventListener('input', signup.validPasswordConfirm);
signup.email.addEventListener('keyup', e => {
  if (e.key === 'Enter') signup.postSignup();
});
signup.name.addEventListener('keyup', e => {
  if (e.key === 'Enter') signup.postSignup();
});
signup.password.addEventListener('keyup', e => {
  if (e.key === 'Enter') signup.postSignup();
});
signup.passwordConfirm.addEventListener('keyup', e => {
  if (e.key === 'Enter') signup.postSignup();
});
// sign out

const signoutBtn = document.getElementById('signoutBtn');
signoutBtn.addEventListener('click', signout);

// close order modal
elements.orderCloseBtn.addEventListener('click', () => {
  elements.orderModal.classList.remove('show__modal');
  localStorage.setItem('recipe-ordered', false);
});
