'use strict';
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
  signupModal.classList.add('show__modal');
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

const countryList = ['ahasjhkda'];

const suggestions = document.querySelector('.suggestions');

const clearSuggestions = () => {
  suggestions.querySelectorAll('li').forEach(val => {
    val.remove();
  });
  suggestions.style = ' padding: 0px';
};
const searchOnInput = () => {
  let check = 0;
  if (search.value) {
    countryList.forEach(val => {
      if (val.toLowerCase().includes(search.value.toLowerCase())) {
        suggestions.style = 'padding: 5px;';
        const suggest = document.createElement('li');
        suggest.innerHTML = `<a href="./pages/search.html?search=${val}" onclick="searchTargetOnClick(this)">${val}</a>`;
        suggestions.prepend(suggest);
        check = 1;
      }
    });
    if (check === 0) clearSuggestions();
  } else {
    clearSuggestions();
  }
};

const searchTargetOnClick = link => {
  localStorage.setItem('search-target', link.textContent);
};
// End Search section

// define arrays of data
const categoriesArr = [];
const recipesArr = [];

// function get categories
let categoriesBtns = null;
const categories = document.querySelector('.categories');

const createCategory = val => {
  const category = document.createElement('button');
  category.classList.add('btn', 'btn-outline-danger');
  category.value = val['_id'];
  category.textContent = val.name;
  return category;
};

const getCategories = async url => {
  await fetch(url, {
    method: 'get',
  })
    .then(res => res.json())
    .then(data => {
      const {
        data: { data: categoriesArray },
      } = data;
      categoriesArray.forEach(val => {
        categories.appendChild(createCategory(val));
        categoriesArr.push(val);
      });

      // console.log(categoriesArray);
    })
    .catch(err => console.error(err));
  categoriesBtns = document.querySelectorAll('.categories .btn');
};

getCategories('https://panda-restaurant.herokuapp.com/api/v1/categories/');

// categories actions
const AfterCatergoriesLoad = 3000;
setTimeout(() => {
  categoriesBtns.forEach(cat => {
    cat.addEventListener('click', () => {
      recipes.classList.add('hidden');
      categoriesSearchContainer.classList.remove('hidden');
      recipesArr.forEach(rec => {
        if (cat.textContent === rec.category) {
          const recipe = document.createElement('div');
          recipe.classList.add('col-sm-12', 'col-md-6', 'col-lg-4');
          recipe.innerHTML = `
            <div class="card">
              <div class="card-body">
                <div class="row recipe">
                  <div class="col-8">
                    <div class="recipe-content">
                      <h4 class="recipe-title">${rec.name}</h4>
                      <p class="recipe-text">
                        ${rec.category}<br>
                        ${rec.slug}
                      </p>
                      <p class="recipe-price">${rec.price}$</p>
                    </div>
                  </div>
                  <div class="col-4 recipe-img">
                    <img
                      src=${rec.imageCover}
                      alt="${rec.name} image"
                      class="recipe-asset"
                    />
                  </div>
                </div>
              </div>
            </div>
        `;
          categoriesSearchContainer.appendChild(recipe);
        }
      });
    });
  });
}, AfterCatergoriesLoad);

const categoriesSearchContainer = document.querySelector('.category-search');

// end get categories

// function get all recipes
const recipes = document.querySelector('.recipes-container');

const getRecipes = async url => {
  await fetch(url, { method: 'get' })
    .then(res => res.json())
    .then(data => {
      const {
        data: { data: recipesArray },
      } = data;
      recipesArray.forEach(val => {
        const recipe = document.createElement('div');
        recipe.classList.add('col-sm-12', 'col-md-6', 'col-lg-4');
        recipe.innerHTML = `
          <div class="card">
            <div class="card-body">
              <div class="row recipe">
                <div class="col-8">
                  <div class="recipe-content">
                    <h4 class="recipe-title">${val.name}</h4>
                    <p class="recipe-text">
                      ${val.category}<br>
                      ${val.slug}
                    </p>
                    <p class="recipe-price">${val.price}$</p>
                  </div>
                </div>
                <div class="col-4 recipe-img">
                  <img
                    src=${val.imageCover}
                    alt="${val.name} image"
                    class="recipe-asset"
                  />
                </div>
              </div>
            </div>
          </div>
      `;
        recipes.appendChild(recipe);
        recipesArr.push(val);
      });

      // console.log(recipesArray);
    })
    .catch(err => console.error(err));
};

getRecipes('https://panda-restaurant.herokuapp.com/api/v1/recipes/');

// End recipies
