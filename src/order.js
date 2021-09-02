import { elements } from './base.js';
const orderItems = [];
// elements.cartModal
//   .querySelectorAll('.row')
//   .forEach(val =>
//     console.log(
//       val.querySelector('.amount').value,
//       val.querySelector('.id').textContent
//     )
//   );
const address = elements.orderModal.querySelector('#address').value,
  phoneNumber = elements.orderModal.querySelector('#phone-number').value;

export const postOrder = () => {
  elements.orderError.textContent = '';
  elements.cartModal.querySelectorAll('.row').forEach(val =>
    orderItems.push({
      recipeId: val.querySelector('.id').textContent,
      amount: val.querySelector('.amount').value,
    })
  );
  const token = localStorage.getItem('user-token');
  console.log(orderItems);
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
      elements.orderModal.classList.remove('show__modal');
      elements.orderResultModal.classList.add('show');
      console.log(data.data.orderContent);
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
        <div class="col-5" style="font-weigth: bold; color: #222;">Recipe Name</div>
        <div class="col-5" style="font-weigth: bold; color: #222;">Amount</div>
        <div class="col-2" style="font-weigth: bold; color: #222;">Price</div>
    </div>
  </li>
  ${data.orderContent.map(el => createRecipeInfo(el)).join('')} 
  <li class="cart-item">
    <div class="row" >
      <div class="col-10" style="font-weigth: bold; color: #222;">Total Price</div>
      <div class="col-2 total-price" style="font-weigth: bold; color: #222;">${
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
        <div class="col-5 recipe-name">${res.recipeName}</div>
        <div class="col-5 recipe-amount">${res.recipeAmount}</div>
        <div class="col-2 recipe-price">${res.recipePrice}$</div>
    </div>
    </li>
    `;
  return content;
};
// {
//     "orderContent": [ {"recipeId": "611db0bf3fb56115f667f87e", "amount": 3}, {"recipeId": "611db0cc3fb56115f667f881"}],
//     "customerAddress": "testaddress",
//     "customerPhoneNumber":"0115151515"
// }
// https://panda-restaurant.herokuapp.com//api/v1/orders/
