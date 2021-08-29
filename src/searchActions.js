const search = document.querySelector('.search-label');
const suggestions = document.querySelector('.suggestions');

export const searchOnChange = async () => {
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
        if (arr.length) {
          suggestions.innerHTML = '';
          arr.forEach(val => {
            suggestions.style = 'padding: 5px;';
            const suggest = document.createElement('li');
            suggest.innerHTML = `<a href="./pages/search.html?search=${val.name}" onclick="searchOnClickLink(this.textContent)">${val.name}</a>`;
            suggestions.prepend(suggest);
          });
        }
      })
      .catch(error => console.log('error', error));
  }
};

// export const searchOnChangeSearchPage = async () => {
//   if (search.value) {
//     const requestOptions = {
//       method: 'GET',
//       redirect: 'follow',
//     };

//     await fetch(
//       `https://panda-restaurant.herokuapp.com/api/v1/recipes/search?s=${search.value}`,
//       requestOptions
//     )
//       .then(res => res.json())
//       .then(data => {
//         const {
//           data: { data: arr },
//         } = data;
//         if (arr.length) {
//           suggestions.innerHTML = '';
//           arr.forEach(val => {
//             suggestions.style = 'padding: 5px;';
//             const suggest = document.createElement('li');
//             suggest.innerHTML = `<a href="./search.html?search=${val.name}" onclick="searchOnClickLink(this.textContent)">${val.name}</a>`;
//             suggestions.prepend(suggest);
//           });
//         }
//       })
//       .catch(error => console.log('error', error));
//   }
// };

export const searchOnClick = url => {
  if (search.value) {
    localStorage.setItem('search-target', search.value);
    window.location = `${url}`;
  }
};

export const searchOnClickLink = value => {
  localStorage.setItem('search-target', value);
};
