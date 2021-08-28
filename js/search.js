'use strict';

import { elements as elements } from './base.js';
import { createRecipe as createRecipe } from './createRecipe.js';
import { createIngredientsModel as createIngredientsModel } from './ingredientsModal.js';
const searchTarget = document.querySelector('.search-target');
let searchWord = localStorage.getItem('search-target');

searchTarget.textContent = `You search about: ${searchWord}`;

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
  clearSuggestions();
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

const searchOnChange = async () => {
  let check = 0;
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
        let check = 0;
        if (arr.length) {
          suggestions.innerHTML = '';
          arr.forEach(val => {
            suggestions.style = 'padding: 5px;';
            const suggest = document.createElement('li');
            suggest.innerHTML = `<a href="./pages/search.html?search=${val.name}" onclick="searchOnClick(this.textContent)">${val.name}</a>`;
            suggestions.prepend(suggest);
            check = 1;
          });
          if (check === 0) clearSuggestions();
        } else {
          clearSuggestions();
        }
        console.log(arr);
      })
      .catch(error => console.log('error', error));
  } else {
    clearSuggestions();
  }
};

window.searchOnChange = searchOnChange;

const searchOnClick = url => {
  if (search.value) {
    localStorage.setItem('search-target', search.value);
    window.location = `${url}`;
  }
};

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

search.addEventListener('input', searchOnChange);

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
