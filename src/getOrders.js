import { elements } from './base.js';
export const getOrdersBtn = document.getElementById('orderBtn');
const token = localStorage.getItem('user-token');

export const getOrders = () => {
  fetch('https://panda-restaurant.herokuapp.com/api/v1/orders/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      const { data: orders } = data;
      const container = document.querySelector('#orderModal .modal-body');
      container.innerHTML = '';
      orders.forEach(element => {
        createOrder(element);
      });
    })
    .catch(err => console.log(err));
};

const createOrder = ord => {
  const order = `

    <div class="row">
    <div class="col=12" style="color: orangered; text-align: center;">${ord.createdAt.slice(
      0,
      10
    )}</div>
      <div class="col-8 cart-content">
        ${ord.orderContent
          .map(val => {
            return `
                <h4>${val.recipeName} <span style="font-size: 0.8em;">  ${val.recipeAmount}x</span></h4>
            `;
          })
          .join('')}
     
      </div>
      <div class="col-4" style="display:flex; flex-flow: column wrap; justify-content: space-between;">
      <div style="color: green; text-align: center;">${ord.totalPrice}$</div>
        <button class="btn btn-md btn-danger" value=${
          ord._id
        } onclick="orderCancel(this)" data-bs-dismiss="modal">Cancel Order</button>
      </div>
    </div>
  
    `;
  const container = document.querySelector('#orderModal .modal-body');
  const orderItem = document.createElement('li');
  orderItem.classList.add('cart-item');
  orderItem.innerHTML = order;

  container.prepend(orderItem);
};

export const orderCancel = order => {
  elements.ordersContainer.classList.remove('show');
  elements.orderCancelModal.classList.add('show');
  elements.orderCancelModal.style = 'display: block';
  fetch(`https://panda-restaurant.herokuapp.com/api/v1/orders/${order.value}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'fail') throw new Error(data.message);
      elements.orderCancelModal.querySelector('.modal-body').innerHTML = `
      <div style='color: green; font-size: bold;'>Canceled</div>
  `;
    })
    .catch(err => {
      elements.orderCancelModal.querySelector('.modal-body').innerHTML = `
            <div style='color: red; font-size: bold;'>${err.message}</div>
        `;
    });
};
