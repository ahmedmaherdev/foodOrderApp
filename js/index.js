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
            suggest.innerHTML = `<a href="./pages/search.html?search=${val.name}" onclick="searchOnClick(this)">${val.name}</a>`;
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

const searchOnClick = val => {
  localStorage.setItem('search-target', val.textContent);
};

// End Search section

// define arrays of data
const categoriesArr = [];
const recipesArr = [];

// let categoriesBtns = 0;
const categories = document.querySelector('.categories');

const createCategory = val => {
  const category = document.createElement('button');
  category.classList.add('btn', 'btn-outline-danger');
  category.value = val['_id'];
  category.textContent = val.name;
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
        categories.appendChild(createCategory(cat));
        createContainerForCatergory(cat.name);
        categoriesArr.push(cat);
        return categoriesArray;
      });
    })

    .catch(err => console.error(err));
};

document.addEventListener('DOMContentLoaded', () => {
  const categoriesBtns = document.querySelectorAll('.categories .btn');
  console.log(categoriesBtns);
  categoriesBtns.forEach(btn => {
    btn.addEventListener('click', categoryAction(btn));
  });
});

// categories btns actions

//////////////////////////////////////////
getCategories('https://panda-restaurant.herokuapp.com/api/v1/categories/');

// function action of catergory
const categoryAction = btn => {
  const containers = document.querySelectorAll('.recipes  .row');
  hideAllContainers(containers);
  containers.forEach(val => {
    if (val.classList.contains(btn.textContent)) {
      val.classList.remove('hidden');
    }
  });
};

// hidden all catergores containers
const hideAllContainers = containers => {
  containers.forEach(val => {
    if (!val.classList.contains('hidden')) {
      val.classList.add('hidden');
    }
  });
};

// function to create container for each category recipes
const createContainerForCatergory = cat => {
  const recipes = document.querySelector('.recipes');
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add(
    'row',
    `${cat.includes(' ') ? cat.replace(' ', '-') : cat}`,
    'hidden'
  );
  recipes.appendChild(categoryContainer);
};

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
        createRecipe(recipes, val);
        recipesArr.push(val);
      });

      console.log(recipesArray);
    })
    .catch(err => console.error(err));
};

// function to create recipe
const createRecipe = (container, res) => {
  const card = `
  <div class="card">
    <div class="card-body">
      <div class="row recipe">
        <div class="col-8">
          <div class="recipe-content">
            <h4 class="recipe-title">${res.name}</h4>
            <p class="recipe-text">
              ${res.category}<br>
              ${res.slug}
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
////////////////////////////////////////

getRecipes('https://panda-restaurant.herokuapp.com/api/v1/recipes/');

// End recipies
