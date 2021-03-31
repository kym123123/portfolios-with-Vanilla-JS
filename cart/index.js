import renderProduct from './utils/renderProduct.js';
import renderMyCart from './utils/renderMyCart.js';
import { adjustItemNumber, adjustCartNumber } from './utils/adjustNumber.js';
import { requestAddCart, requestGetCart } from './utils/requestFunctions.js';
import renderTotal from './utils/renderTotal.js';

let items = [];
let myCartItems = [];

const $blurContainer = document.querySelector('.blur-container');
const $cartContainer = document.querySelector('.cart-container');
const $totalCost = $cartContainer.querySelector('.cart-total');

const $items = document.querySelector('.items');
let $cartItems = document.querySelector('.cart-items');

document.addEventListener('DOMContentLoaded', async () => {
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:3000/product');
      items = await res.json();
    } catch (e) {
      console.log(e);
    }
  };

  await fetchItems();
  renderProduct($items, items);
});

$cartContainer.addEventListener('click', async e => {
  // e타겟이 container가 아니거나, 이미 container가 열려있는 상태면 아무것도 하지 않는다.
  if (!e.target.matches('.cart-container') || e.target.classList.contains('active')) return;

  myCartItems = await requestGetCart();
  console.log(myCartItems);
  $cartItems.replaceChildren(renderMyCart(myCartItems));

  document.body.style.overflowY = 'hidden';
  e.target.classList.add('active');
  $blurContainer.classList.add('active');

  $totalCost.textContent = renderTotal(myCartItems);
});

$blurContainer.addEventListener('click', e => {
  document.body.style.overflowY = 'unset';
  e.target.classList.remove('active');
  $cartContainer.classList.remove('active');
});

$items.addEventListener('click', adjustItemNumber);

$items.addEventListener('click', requestAddCart);

$cartItems.addEventListener('click', async e => {
  if (!(e.target.matches('.cart-item-delete') || e.target.matches('.fa-trash'))) return;

  const product_id = e.target.closest('li').classList[1];
  const option = {
    method: 'DELETE',
  };
  const res = await fetch(`http://localhost:3000/mycart/delete/${product_id}`, option);
  myCartItems = await res.json();

  console.log(myCartItems);
  $totalCost.textContent = renderTotal(myCartItems);
  $cartItems.replaceChildren(renderMyCart(myCartItems));
});

$cartItems.addEventListener('click', async e => {
  myCartItems = await adjustCartNumber(e);
  console.log(myCartItems);
  $totalCost.textContent = renderTotal(myCartItems);
});
