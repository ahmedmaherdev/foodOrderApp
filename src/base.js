export const elements = {
  closeSignup: document.getElementById('close'),
  closeSignin: document.getElementById('signin-close'),
  orderNow: document.getElementById('orderNow'),
  signupModal: document.getElementById('signup-modal'),
  signinModal: document.getElementById('signin-modal'),
  cartModal: document.getElementById('cartModal'),
  recipeContainer: document.querySelector('.recipes-container'),

  //ingredient modal*******************
  detailsModal: document.getElementById('detailsModal'),
  ingredientBody: document.getElementById('ingredients'),
  // card: document.querySelectorAll('.card');
  closeDetailsModal: document.querySelectorAll('.close__details'),
  //ingredient modal*******************

  signup: document.getElementById('signup'),
  signin: document.getElementById('signin'),
  profileBtn: document.getElementById('profileBtn'),

  // order modal
  orderModal: document.getElementById('order-modal'),
  orderCloseBtn: document.querySelector('#order-close'),
  orderNowBtn: document.querySelector('#order-modal .order'),
  orderError: document.querySelector('#order-modal .order-error'),

  // Order Result Modal
  orderResultModal: document.getElementById('orderResultModal'),

  // cancel modal
  orderCancelModal: document.getElementById('orderCancelModal'),
  ordersContainer: document.querySelector('#orderModal'),
  // favorite modal
  favoriteModal: document.getElementById('favouriteModal'),
};

//   module.export = resObj

const elementString = {
  loader: 'spinner',
};

export function loadSpinner(parentElement) {
  const loader = `
      <div class="${elementString.loader}"></div>
      `;
  parentElement.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
