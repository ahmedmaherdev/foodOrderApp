export const elements = {
  closeSignup: document.getElementById('close'),
  closeSignin: document.getElementById('signin-close'),
  orderNow: document.getElementById('orderNow'),
  signupModal: document.getElementById('signup-modal'),
  signinModal: document.getElementById('signin-modal'),
  cartModal: document.getElementById('cartModal'),
  recipeContainer: document.querySelector('.recipes-container'),
  popular: document.querySelector('.popular'),

  //ingredient modal*******************
  detailsModal: document.getElementById('detailsModal'),
  ingredientBody: document.getElementById('ingredients'),
  // card: document.querySelectorAll('.card');
  closeDetailsModal: document.querySelectorAll('.close__details'),
  //ingredient modal*******************

  signup: document.getElementById('signup'),
  signin: document.getElementById('signin'),
  profileBtn: document.getElementById('profileBtn'),
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
