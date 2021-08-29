// function to create recipe
export const createRecipe = (container, res) => {
  const card = `
    <div class="card" onclick="makemodalVisible(this)">
      <div class="card-body">
        <div class="row recipe">
          <div class="col-8">
            <div class="recipe-content">
              <h4 class="recipe-title recipe-name">${res.name}</h4>
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

export const popular = document.querySelector('.popular');
export const createPopular = (container, res) => {
  const poplularCard = `
  <div class="card" onclick="makemodalVisible(this)">
    <img
      src=${res.imageCover}
      alt="pizza image"
      class="card-img-top"
    />
    <div class="card-body">
      <div class="food-info">
        <h4 class="card-title recipe-name">${res.name}</h4>
        <p class="card-text price">${res.price}$</p>
      </div>
    </div>
  </div>

  `;
  const recipe = document.createElement('div');
  recipe.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
  recipe.innerHTML = poplularCard;
  container.appendChild(recipe);
};
////////////////////////////////////////

// End recipies
