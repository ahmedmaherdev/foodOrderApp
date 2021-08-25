'use strict';

const searchTarget = document.querySelector('.search-target');
let searchWord = localStorage.getItem('search-target');

searchTarget.textContent = `You search about: ${searchWord}`;

const closeSignup = document.getElementById('close');
const closeSignin = document.getElementById('signin-close');
const orderNow = document.getElementById('orderNow');
const signupModal = document.getElementById('signup-modal');
const signinModal = document.getElementById('signin-modal');
const cartModal = document.getElementById('cartModal');

//ingredient modal*******************
const detailsModal = document.getElementById('detailsModal');
const card = document.querySelectorAll('.card');
const closeDetailsModal = document.querySelectorAll('.close__details');
//ingredient modal*******************

const signup = document.getElementById('signup'),
  signin = document.getElementById('signin');

signup.addEventListener('click', () => {
  ui.signupModal.classList.add('show__modal');
});

signin.addEventListener('click', () => {
  signinModal.classList.add('show__modal');
});

//show modal
orderNow.addEventListener('click', () => {
  signupModal.classList.add('show__modal');
});

//hide modal
closeSignup.addEventListener('click', () => {
  signupModal.classList.remove('show__modal');
});

closeSignin.addEventListener('click', () => {
  signinModal.classList.remove('show__modal');
});

//hide modal outside  click
window.addEventListener('click', e => {
  e.target == signupModal ? signupModal.classList.remove('show__modal') : false;
  e.target == signinModal ? signinModal.classList.remove('show__modal') : false;
  clearSuggestions();
});

//show ingredients details modal************************************
card.forEach(value => {
  value.addEventListener('click', () => {
    detailsModal.classList.add('show');
  });
});

//hide details  modal
closeDetailsModal.forEach(value => {
  value.addEventListener('click', () => {
    detailsModal.classList.remove('show');
  });
});

//hide details  modal outside  click
window.addEventListener('click', e => {
  e.target == detailsModal ? detailsModal.classList.remove('show') : false;
});

//show ingredients details modal****************************

// search section
const search = document.querySelector('.search-label');

const suggestions = document.querySelector('.suggestions');
const clearSuggestions = () => {
  suggestions.querySelectorAll('li').forEach(val => {
    val.remove();
  });
  suggestions.style = ' padding: 0px';
};
const searchOnInput = async () => {
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
          arr.forEach(val => {
            suggestions.style = 'padding: 5px;';
            const suggest = document.createElement('li');
            suggest.innerHTML = `<a href="../pages/search.html?search=${val.name}" onclick="searchOnClick(this.textContent)">${val.name}</a>`;
            suggestions.prepend(suggest);
            check = 1;
          });
          if (check === 0) clearSuggestions();
        } else {
          clearSuggestions();
        }
        console.log(arr);
        return;
      })
      .catch(error => console.log('error', error));
  } else {
    clearSuggestions();
  }
};

// function search after clicked
const searchOnClick = val => {
  localStorage.setItem('search-target', val);
};

// search btn
const searchBtn = document.getElementById('search');
const searchBtnLink = document.querySelector('.search-btn-link');

searchBtn.addEventListener('click', () => {
  searchOnClick(search.value);
});

searchBtn.addEventListener('focus', () => {
  searchBtnLink.style.color = '#eee';
});

searchBtnLink.addEventListener('click', searchOnClick(search.value));

// add Enter Event to search input

search.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    searchOnClick(search.value);
    window.location = './search.html';
  }
});

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
      const recipes = document.querySelector('.recipes .row');
      arr.forEach(res => {
        // if (res.name === search)
        createRecipe(recipes, res);
      });
    });
};

// function create cart
const createRecipe = (container, res) => {
  //  <div class="col-sm-12 col-md-6 col-lg-4">

  const card = `
 
  <div class="card">
    <div class="card-body">
      <div class="row recipe">
        <div class="col-8">
          <div class="recipe-content">
            <h4 class="recipe-title">${res.name}</h4>
            <p class="recipe-text">
              ${res.category}
            </p>
            <p class="recipe-price">${res.price}$</p>
          </div>
        </div>
        <div class="col-4 recipe-img">
          <img
            src=${res.imageCover}
            alt="${res.name} image"
            class="recipe-asset"
          />
        </div>
      </div>
    </div>
  </div>
  `;
  const recipe = document.createElement('div');
  recipe.classList.add('col-sm-12', 'col-md-6', 'col-lg-4');
  recipe.innerHTML = card;
  container.appendChild(recipe);
};

searchTargetContent(searchWord);
// form validation

// password confirmation
