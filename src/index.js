'use strict';

import { elements, loadSpinner, clearLoader } from './base.js';
import { createPopular, popular } from './createRecipe.js';
import { DisplayList, SetupPagination } from './paginations.js';
import { createIngredientsModel } from './ingredientsModal.js';
import {
  searchOnChange,
  searchOnClick,
  searchOnClickLink,
} from './searchActions.js';

let current_page = 1;
let itemsPerPage = 3;

//////////////////////////////////////////////////////////////////////
// search section

const search = document.querySelector('.search-label');
const suggestions = document.querySelector('.suggestions');

window.searchOnClick = searchOnClick;
window.searchOnChange = searchOnChange;
window.searchOnClickLink = searchOnClickLink;
// search btn
const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', () => {
  searchOnClick('./pages/search.html');
});

search.addEventListener('input', searchOnChange);

// add Enter Event to search input

search.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    searchOnClick('./pages/search.html');
  }
});

// End Search section
/////////////////////////////////////////////////////////////////////

// define arrays of data
const categoriesArr = [];
const recipesArr = [];

const categories = document.querySelector('.categories');

const createCategory = val => {
  const category = document.createElement('button');
  category.classList.add('btn', 'btn-outline-danger');
  category.value = val['_id'];
  category.textContent = val.name;
  category.setAttribute('onclick', 'categoryBtnAction(this.textContent)');
  return category;
};

// function get catergories
const getCategories = async url => {
  await fetch(url, {
    method: 'get',
  })
    .then(res => res.json())
    .then(data => {
      const {
        data: { data: categoriesArray },
      } = data;
      categoriesArray.forEach(cat => {
        const category = createCategory(cat);
        categories.appendChild(category);
        categoriesArr.push(cat);
      });
    })

    .catch(err => console.error(err));
};

// categories btns actions

const categoryBtnAction = async categoryName => {
  await fetch(
    `https://panda-restaurant.herokuapp.com/api/v1/recipes/?category=${categoryName}`,
    {
      method: 'get',
    }
  )
    .then(res => res.json())
    .then(data => {
      const {
        data: { data: recipesArray },
      } = data;
      // console.log(recipesArray);
      DisplayList(recipesArray, recipes, itemsPerPage, current_page);
      SetupPagination(recipesArray, pages, itemsPerPage);
    })

    .catch(err => console.error(err));
};
window.categoryBtnAction = categoryBtnAction;
//////////////////////////////////////////
getCategories('https://panda-restaurant.herokuapp.com/api/v1/categories/');

// end get categories

///////////////////////////////////////////////////////////////////////////////

// function get all recipes
// const recipes = document.querySelector('.recipes-container');
const recipes = elements.recipeContainer;
const pages = document.querySelector('.pages');

const getRecipes = async url => {
  loadSpinner(recipes);
  await fetch(url, { method: 'get' })
    .then(res => res.json())
    .then(data => {
      const {
        data: { data: recipesArray },
      } = data;
      const popularArray = [...recipesArray.slice(0, 4)];
      recipesArray.forEach(val => {
        recipesArr.push(val);
      });
      popularArray.forEach(res => createPopular(popular, res));
      return recipesArray;
    })
    .then(arr => {
      clearLoader();
      DisplayList(arr, recipes, itemsPerPage, current_page);
      SetupPagination(arr, pages, itemsPerPage);
      return arr;
    })

    .catch(err => console.error(err));
};

getRecipes('https://panda-restaurant.herokuapp.com/api/v1/recipes/');

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

/*Events */
elements.signup.addEventListener('click', () => {
  elements.signupModal.classList.add('show__modal');
});

elements.signin.addEventListener('click', () => {
  elements.signinModal.classList.add('show__modal');
});

//show modal
elements.orderNow.addEventListener('click', () => {
  elements.signupModal.classList.add('show__modal');
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
  suggestions.innerHTML = '';
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