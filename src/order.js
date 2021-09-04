import { elements } from './base.js';
let orderItems = [];
elements.orderError.textContent = '';
const token = localStorage.getItem('user-token');

export const postOrder = () => {
  const address = elements.orderModal.querySelector('#address').value,
    phoneNumber = elements.orderModal.querySelector('#phone-number').value;
  if (JSON.parse(localStorage.getItem('card')).length > 0) {
    orderItems = [];
    elements.cartModal.querySelectorAll('.row').forEach(val =>
      orderItems.push({
        recipeId: val.querySelector('.id').textContent,
        amount: val.querySelector('.amount').value,
      })
    );
  }

  if (JSON.parse(localStorage.getItem('recipe-ordered'))) {
    orderItems = [];
    orderItems.push({
      recipeId: elements.detailsModal.querySelector('.recipe__btn__order')
        .value,
      amount: elements.detailsModal.querySelector('.recipe__amount').value,
    });
  }

  fetch('https://panda-restaurant.herokuapp.com/api/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderContent: orderItems,
      customerAddress: address,
      customerPhoneNumber: phoneNumber,
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'fail') throw new Error(data.message);
      localStorage.setItem('card', JSON.stringify([]));
      localStorage.setItem('recipe-ordered', false);
      elements.orderModal.classList.remove('show__modal');
      elements.orderResultModal.classList.add('show');
      elements.orderResultModal.style = 'display: block';
      showResultOrder(data.data);
    })
    .catch(err => {
      elements.orderError.textContent = err.message;
    });
};

export const showResultOrder = data => {
  const container = elements.orderResultModal.querySelector(
    '.order-result-items'
  );
  container.innerHTML = '';
  const result = `
  <ul class="cart-items">
    <li class="cart-item">
    <div class="row">
        <div class="col-4" style="font-weigth: bold; color: #222;">Recipe Name</div>
        <div class="col-4" style="font-weigth: bold; color: #222;">Amount</div>
        <div class="col-4" style="font-weigth: bold; color: #222;">Price</div>
    </div>
  </li>
  ${data.orderContent.map(el => createRecipeInfo(el)).join('')} 
  <li class="cart-item">
    <div class="row" >
      <div class="col-8" style="font-weigth: bold; color: #222;">Total Price</div>
      <div class="col-4 total-price" style="font-weigth: bold; color: green;">${
        data.totalPrice
      }$</div>
    </div>
  </li> 
  </ul>
    `;

  container.innerHTML = result;
};

const createRecipeInfo = res => {
  const content = `
  <li class="cart-item">
    <div class="row">
        <div class="col-4 recipe-name" >${res.recipeName}</div>
        <div class="col-4 recipe-amount" >${res.recipeAmount}</div>
        <div class="col-4 recipe-price" style="color: green; ">${res.recipePrice}$</div>
    </div>
    </li>
    `;
  return content;
};

export const closeModalResult = modal => {
  modal.style = 'display: none;';
  modal.classList.remove('show');
};
