/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"elements\": () => (/* binding */ elements),\n/* harmony export */   \"loadSpinner\": () => (/* binding */ loadSpinner),\n/* harmony export */   \"clearLoader\": () => (/* binding */ clearLoader)\n/* harmony export */ });\nconst elements = {\n  closeSignup: document.getElementById('close'),\n  closeSignin: document.getElementById('signin-close'),\n  orderNow: document.getElementById('orderNow'),\n  signupModal: document.getElementById('signup-modal'),\n  signinModal: document.getElementById('signin-modal'),\n  cartModal: document.getElementById('cartModal'),\n  recipeContainer: document.querySelector('.recipes-container'),\n\n  //ingredient modal*******************\n  detailsModal: document.getElementById('detailsModal'),\n  ingredientBody: document.getElementById('ingredients'),\n  // card: document.querySelectorAll('.card');\n  closeDetailsModal: document.querySelectorAll('.close__details'),\n  //ingredient modal*******************\n\n  signup: document.getElementById('signup'),\n  signin: document.getElementById('signin')\n}\n\n//   module.export = resObj\n\nconst elementString = {\n  loader: 'spinner'\n}\n\n\nfunction loadSpinner(parentElement) {\n  const loader = `\n      <div class=\"${elementString.loader}\"></div>\n      `;\n      parentElement.insertAdjacentHTML('afterbegin', loader)\n}\n\nconst clearLoader = () => {\n  const loader = document.querySelector(`.${elementString.loader}`);\n  if(loader) loader.parentElement.removeChild(loader)\n}\n\n//# sourceURL=webpack://foodorderapp/./src/base.js?");

/***/ }),

/***/ "./src/createRecipe.js":
/*!*****************************!*\
  !*** ./src/createRecipe.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createRecipe\": () => (/* binding */ createRecipe),\n/* harmony export */   \"popular\": () => (/* binding */ popular),\n/* harmony export */   \"createPopular\": () => (/* binding */ createPopular)\n/* harmony export */ });\n// function to create recipe\nconst createRecipe = (container, res) => {\n  const card = `\n    <div class=\"card\" onclick=\"makemodalVisible(this)\">\n      <div class=\"card-body\">\n        <div class=\"row recipe\">\n          <div class=\"col-8\">\n            <div class=\"recipe-content\">\n              <h4 class=\"recipe-title recipe-name\">${res.name}</h4>\n              <p class=\"recipe-text\">\n                ${res.category}\n              </p>\n              <p class=\"recipe-price\">${res.price}$</p>\n            </div>\n          </div>\n          <div class=\"col-4 recipe-img\">\n            <img\n              src=${res.imageCover}\n              alt=\"${res.name} image\"\n              class=\"recipe-asset\"\n            />\n          </div>\n        </div>\n      </div>\n    </div>\n  `;\n  const recipe = document.createElement('div');\n  recipe.classList.add('col-sm-12', 'col-md-6', 'col-lg-4');\n  recipe.innerHTML = card;\n  container.appendChild(recipe);\n};\n\nconst popular = document.querySelector('.popular');\nconst createPopular = (container, res) => {\n  const poplularCard = `\n  <div class=\"card\" onclick=\"makemodalVisible(this)\">\n    <img\n      src=${res.imageCover}\n      alt=\"pizza image\"\n      class=\"card-img-top\"\n    />\n    <div class=\"card-body\">\n      <div class=\"food-info\">\n        <h4 class=\"card-title recipe-name\">${res.name}</h4>\n        <p class=\"card-text price\">${res.price}$</p>\n      </div>\n    </div>\n  </div>\n\n  `;\n  const recipe = document.createElement('div');\n  recipe.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');\n  recipe.innerHTML = poplularCard;\n  container.appendChild(recipe);\n};\n////////////////////////////////////////\n\n// End recipies\n\n\n//# sourceURL=webpack://foodorderapp/./src/createRecipe.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/base.js\");\n/* harmony import */ var _createRecipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createRecipe.js */ \"./src/createRecipe.js\");\n/* harmony import */ var _paginations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paginations.js */ \"./src/paginations.js\");\n/* harmony import */ var _ingredientsModal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ingredientsModal.js */ \"./src/ingredientsModal.js\");\n/* harmony import */ var _searchActions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./searchActions.js */ \"./src/searchActions.js\");\n\n\n\n\n\n\n\n\nlet current_page = 1;\nlet itemsPerPage = 3;\n\n//////////////////////////////////////////////////////////////////////\n// search section\n\nconst search = document.querySelector('.search-label');\nconst suggestions = document.querySelector('.suggestions');\n\nwindow.searchOnClick = _searchActions_js__WEBPACK_IMPORTED_MODULE_4__.searchOnClick;\nwindow.searchOnChange = _searchActions_js__WEBPACK_IMPORTED_MODULE_4__.searchOnChange;\nwindow.searchOnClickLink = _searchActions_js__WEBPACK_IMPORTED_MODULE_4__.searchOnClickLink;\n// search btn\nconst searchBtn = document.getElementById('search');\nsearchBtn.addEventListener('click', () => {\n  (0,_searchActions_js__WEBPACK_IMPORTED_MODULE_4__.searchOnClick)('./pages/search.html');\n});\n\nsearch.addEventListener('input', _searchActions_js__WEBPACK_IMPORTED_MODULE_4__.searchOnChange);\n\n// add Enter Event to search input\n\nsearch.addEventListener('keyup', e => {\n  if (e.key === 'Enter') {\n    (0,_searchActions_js__WEBPACK_IMPORTED_MODULE_4__.searchOnClick)('./pages/search.html');\n  }\n});\n\n// End Search section\n/////////////////////////////////////////////////////////////////////\n\n// define arrays of data\nconst categoriesArr = [];\nconst recipesArr = [];\n\nconst categories = document.querySelector('.categories');\n\nconst createCategory = val => {\n  const category = document.createElement('button');\n  category.classList.add('btn', 'btn-outline-danger');\n  category.value = val['_id'];\n  category.textContent = val.name;\n  category.setAttribute('onclick', 'categoryBtnAction(this.textContent)');\n  return category;\n};\n\n// function get catergories\nconst getCategories = async url => {\n  await fetch(url, {\n    method: 'get',\n  })\n    .then(res => res.json())\n    .then(data => {\n      const {\n        data: { data: categoriesArray },\n      } = data;\n      categoriesArray.forEach(cat => {\n        const category = createCategory(cat);\n        categories.appendChild(category);\n        categoriesArr.push(cat);\n      });\n    })\n\n    .catch(err => console.error(err));\n};\n\n// categories btns actions\n\nconst categoryBtnAction = async categoryName => {\n  await fetch(\n    `https://panda-restaurant.herokuapp.com/api/v1/recipes/?category=${categoryName}`,\n    {\n      method: 'get',\n    }\n  )\n    .then(res => res.json())\n    .then(data => {\n      const {\n        data: { data: recipesArray },\n      } = data;\n      // console.log(recipesArray);\n      (0,_paginations_js__WEBPACK_IMPORTED_MODULE_2__.DisplayList)(recipesArray, recipes, itemsPerPage, current_page);\n      (0,_paginations_js__WEBPACK_IMPORTED_MODULE_2__.SetupPagination)(recipesArray, pages, itemsPerPage);\n    })\n\n    .catch(err => console.error(err));\n};\nwindow.categoryBtnAction = categoryBtnAction;\n//////////////////////////////////////////\ngetCategories('https://panda-restaurant.herokuapp.com/api/v1/categories/');\n\n// end get categories\n\n///////////////////////////////////////////////////////////////////////////////\n\n// function get all recipes\n// const recipes = document.querySelector('.recipes-container');\nconst recipes = _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.recipeContainer;\nconst pages = document.querySelector('.pages');\n\nconst getRecipes = async url => {\n  (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.loadSpinner)(recipes);\n  await fetch(url, { method: 'get' })\n    .then(res => res.json())\n    .then(data => {\n      const {\n        data: { data: recipesArray },\n      } = data;\n      const popularArray = [...recipesArray.slice(0, 4)];\n      recipesArray.forEach(val => {\n        recipesArr.push(val);\n      });\n      popularArray.forEach(res => (0,_createRecipe_js__WEBPACK_IMPORTED_MODULE_1__.createPopular)(_createRecipe_js__WEBPACK_IMPORTED_MODULE_1__.popular, res));\n      return recipesArray;\n    })\n    .then(arr => {\n      (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.clearLoader)();\n      (0,_paginations_js__WEBPACK_IMPORTED_MODULE_2__.DisplayList)(arr, recipes, itemsPerPage, current_page);\n      (0,_paginations_js__WEBPACK_IMPORTED_MODULE_2__.SetupPagination)(arr, pages, itemsPerPage);\n      return arr;\n    })\n\n    .catch(err => console.error(err));\n};\n\ngetRecipes('https://panda-restaurant.herokuapp.com/api/v1/recipes/');\n\nconst makemodalVisible = async card => {\n  await fetch(\n    `https://panda-restaurant.herokuapp.com/api/v1/recipes/?name=${\n      card.querySelector('.recipe-name').textContent\n    }`\n  )\n    .then(res => res.json())\n    .then(data => {\n      const {\n        data: { data: rec },\n      } = data;\n      _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.detailsModal.classList.add('show');\n      (0,_ingredientsModal_js__WEBPACK_IMPORTED_MODULE_3__.createIngredientsModel)(rec);\n    });\n};\n\nwindow.makemodalVisible = makemodalVisible;\n\n/*Events */\n_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signup.addEventListener('click', () => {\n  _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signupModal.classList.add('show__modal');\n});\n\n_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signin.addEventListener('click', () => {\n  _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signinModal.classList.add('show__modal');\n});\n\n//show modal\n_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.orderNow.addEventListener('click', () => {\n  _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signupModal.classList.add('show__modal');\n});\n\n//hide modal\n_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.closeSignup.addEventListener('click', () => {\n  _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signupModal.classList.remove('show__modal');\n});\n\n_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.closeSignin.addEventListener('click', () => {\n  _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signinModal.classList.remove('show__modal');\n});\n\n//hide modal outside  click\nwindow.addEventListener('click', e => {\n  e.target == _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signupModal\n    ? _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signupModal.classList.remove('show__modal')\n    : false;\n  e.target == _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signinModal\n    ? _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.signinModal.classList.remove('show__modal')\n    : false;\n  suggestions.innerHTML = '';\n});\n\n//hide details  modal\n_base_js__WEBPACK_IMPORTED_MODULE_0__.elements.closeDetailsModal.forEach(value => {\n  value.addEventListener('click', () => {\n    _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.detailsModal.classList.remove('show');\n  });\n});\n\n//hide details  modal outside  click\nwindow.addEventListener('click', e => {\n  e.target == _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.detailsModal\n    ? _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.detailsModal.classList.remove('show')\n    : false;\n});\n\n\n//# sourceURL=webpack://foodorderapp/./src/index.js?");

/***/ }),

/***/ "./src/ingredientsModal.js":
/*!*********************************!*\
  !*** ./src/ingredientsModal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createIngredientsModel\": () => (/* binding */ createIngredientsModel)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/base.js\");\n\n\nconst createIngredientLi = el => `\n  <li class=\"recipe__item\">\n    <i class=\"fas fa-check recipe__icon\"></i>\n    <div class=\"recipe__ingredient\">\n        <span class=\"recipe__unit\">${el}</span>\n        \n    </div>\n  </li>\n  `;\n\nfunction createIngredientsModel(rec) {\n  const [recipe] = rec;\n  const markup = `\n    <div class=\"recipe\">\n      <figure class=\"recipe__fig\">\n        <img src=\"${recipe.imageCover}\" alt=\"${\n    recipe.name\n  }\" class=\"recipe__img\">\n        <h1 class=\"recipe__title\">\n          <span>${recipe.name}</span>\n        </h1>\n      </figure>\n      <div class=\"recipe__details\">\n        <div class=\"recipe__info\">\n          <i class=\"fas fa-male recipe__info-icon\"></i>\n          <span class=\"recipe__info-people\">${recipe.cookingTime}</span>\n          <span class=\"recipe__info-text\"> min</span>\n        </div>\n        <div class=\"recipe-button\">\n          <button class=\"recipe__love\">\n            <i class=\"far fa-heart\"></i>\n          </button>\n        </div>\n      </div>\n\n      <div class=\"recipe__ingredients\">\n        <ul class=\"recipe__ingredient-list\">\n        ${recipe.ingredients.map(el => createIngredientLi(el)).join('')} \n        </ul>\n        <button class=\"btn-small recipe__btn\">\n          <i class=\"fas fa-cart-plus\"></i>\n            <span>Add to Cart</span>\n        </button>\n      </div>\n    </div>\n\n  `;\n  _base_js__WEBPACK_IMPORTED_MODULE_0__.elements.ingredientBody.innerHTML = markup;\n}\n\n\n//# sourceURL=webpack://foodorderapp/./src/ingredientsModal.js?");

/***/ }),

/***/ "./src/paginations.js":
/*!****************************!*\
  !*** ./src/paginations.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DisplayList\": () => (/* binding */ DisplayList),\n/* harmony export */   \"SetupPagination\": () => (/* binding */ SetupPagination)\n/* harmony export */ });\n/* harmony import */ var _createRecipe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createRecipe.js */ \"./src/createRecipe.js\");\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.js */ \"./src/base.js\");\n\n\n/* pagination */\nconst recipes = _base_js__WEBPACK_IMPORTED_MODULE_1__.elements.recipeContainer;\n\nlet current_page = 1;\nlet itemsPerPage = 3;\n\nfunction DisplayList(items, wrapper, rows_per_page, page) {\n  wrapper.innerHTML = '';\n  page--;\n\n  let start = rows_per_page * page;\n  let end = start + rows_per_page;\n  let paginatedItems = items.slice(start, end);\n\n  for (let i = 0; i < paginatedItems.length; i++) {\n    let item = paginatedItems[i];\n\n    (0,_createRecipe_js__WEBPACK_IMPORTED_MODULE_0__.createRecipe)(wrapper, item);\n  }\n}\n\nfunction SetupPagination(items, wrapper, rows_per_page) {\n  wrapper.innerHTML = '';\n\n  let page_count = Math.ceil(items.length / rows_per_page);\n  for (let i = 1; i < page_count + 1; i++) {\n    let btn = PaginationButton(i, items);\n    wrapper.appendChild(btn);\n  }\n}\n\nfunction PaginationButton(page, items) {\n  let button = document.createElement('button');\n  button.innerText = page;\n\n  if (current_page == page) button.classList.add('active');\n\n  button.addEventListener('click', function () {\n    current_page = page;\n    DisplayList(items, recipes, itemsPerPage, current_page);\n\n    let current_btn = document.querySelector('.pages button.active');\n    current_btn.classList.remove('active');\n\n    button.classList.add('active');\n  });\n\n  return button;\n}\n\n/* end Pagination */\n\n\n//# sourceURL=webpack://foodorderapp/./src/paginations.js?");

/***/ }),

/***/ "./src/searchActions.js":
/*!******************************!*\
  !*** ./src/searchActions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchOnChange\": () => (/* binding */ searchOnChange),\n/* harmony export */   \"searchOnClick\": () => (/* binding */ searchOnClick),\n/* harmony export */   \"searchOnClickLink\": () => (/* binding */ searchOnClickLink)\n/* harmony export */ });\nconst search = document.querySelector('.search-label');\nconst suggestions = document.querySelector('.suggestions');\n\nconst searchOnChange = async () => {\n  if (search.value) {\n    const requestOptions = {\n      method: 'GET',\n      redirect: 'follow',\n    };\n\n    await fetch(\n      `https://panda-restaurant.herokuapp.com/api/v1/recipes/search?s=${search.value}`,\n      requestOptions\n    )\n      .then(res => res.json())\n      .then(data => {\n        const {\n          data: { data: arr },\n        } = data;\n        if (arr.length) {\n          suggestions.innerHTML = '';\n          arr.forEach(val => {\n            suggestions.style = 'padding: 5px;';\n            const suggest = document.createElement('li');\n            suggest.innerHTML = `<a href=\"./pages/search.html?search=${val.name}\" onclick=\"searchOnClickLink(this.textContent)\">${val.name}</a>`;\n            suggestions.prepend(suggest);\n          });\n        }\n      })\n      .catch(error => console.log('error', error));\n  }\n};\n\n// export const searchOnChangeSearchPage = async () => {\n//   if (search.value) {\n//     const requestOptions = {\n//       method: 'GET',\n//       redirect: 'follow',\n//     };\n\n//     await fetch(\n//       `https://panda-restaurant.herokuapp.com/api/v1/recipes/search?s=${search.value}`,\n//       requestOptions\n//     )\n//       .then(res => res.json())\n//       .then(data => {\n//         const {\n//           data: { data: arr },\n//         } = data;\n//         if (arr.length) {\n//           suggestions.innerHTML = '';\n//           arr.forEach(val => {\n//             suggestions.style = 'padding: 5px;';\n//             const suggest = document.createElement('li');\n//             suggest.innerHTML = `<a href=\"./search.html?search=${val.name}\" onclick=\"searchOnClickLink(this.textContent)\">${val.name}</a>`;\n//             suggestions.prepend(suggest);\n//           });\n//         }\n//       })\n//       .catch(error => console.log('error', error));\n//   }\n// };\n\nconst searchOnClick = url => {\n  if (search.value) {\n    localStorage.setItem('search-target', search.value);\n    window.location = `${url}`;\n  }\n};\n\nconst searchOnClickLink = value => {\n  localStorage.setItem('search-target', value);\n};\n\n\n//# sourceURL=webpack://foodorderapp/./src/searchActions.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;