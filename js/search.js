'use strict';

const searchTarget = document.querySelector('.search-target');

let searchWord = localStorage.getItem('search-target');

searchTarget.textContent = `You search about: ${searchWord}`;
