import renderProduct from './utils/renderProduct.js';
import renderMyCart from './utils/renderMyCart.js';
import { adjustItemNumber, adjustCartNumber } from './utils/adjustNumber.js';
import { requestAddCart, requestGetCart } from './utils/requestFunctions.js';
import renderTotal from './utils/renderTotal.js';
import Modal from './utils/Modal.js';
import getScrollContainer from './utils/Scroll.js';
import renderPagination from './utils/renderPagination.js';

let items = [];
let myCartItems = [];
let lastPageNumber = 10;
let currentPageNumber = 1;

const $blurContainer = document.querySelector('.blur-container');
const $cartContainer = document.querySelector('.cart-container');
const $totalCost = $cartContainer.querySelector('.cart-total');
const $paginationContainer = document.querySelector('.pagination-container');
const $shoppingContainer = document.querySelector('.shopping-container');
const $shoppingList = document.querySelector('.shopping-list');
let $cartItems = document.querySelector('.cart-items');

document.addEventListener('DOMContentLoaded', async () => {
  let flag = 0;
  const $items = document.querySelector('.items');
  const fetchItems = async () => {
    try {
      const res = await fetch(`http://localhost:3000/product/${currentPageNumber}`);
      console.log(res);
      const res2 = await res.json();
      lastPageNumber = res2.lastPage;
      items = res2.products;
    } catch (e) {
      const $error = document.createElement('div');
      $error.textContent = "Couldn't find the server.";
      $error.classList.add('error-elem');

      $shoppingContainer.replaceWith($error);
      console.log(e);
    }
  };
  await fetchItems();
  renderProduct($items, items);
  renderPagination(currentPageNumber, lastPageNumber, $paginationContainer);

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 200 && flag === 0) {
      document.body.appendChild(getScrollContainer());
      flag = 1;
    } else if (window.scrollY < 200 && flag === 1) {
      const $scrollUpContainer = document.querySelector('.scroll-up-container');
      $scrollUpContainer.classList.add('disappear');

      $scrollUpContainer.addEventListener('animationend', () => {
        $scrollUpContainer.remove();
      });
      flag = 0;
    }
  });

  window.customElements.define('product-modal', Modal);
});

$cartContainer.addEventListener('click', async e => {
  // e????????? container??? ????????????, ?????? container??? ???????????? ????????? ???????????? ?????? ?????????.
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

$shoppingList.addEventListener('click', adjustItemNumber);

$shoppingList.addEventListener('click', requestAddCart);

$shoppingList.addEventListener('click', e => {
  if (e.target.matches('.item-name') || e.target.matches('.item-img')) {
    document.body.prepend(document.createElement('product-modal'));
    const $modal = document.querySelector('product-modal');

    $modal.setAttribute('name', e.target.closest('li').querySelector('.item-name').textContent);
    $modal.setAttribute('price', e.target.closest('li').querySelector('.item-price').textContent);
    $modal.setAttribute('img', e.target.closest('li').querySelector('.item-img').dataset.src);
  }
});

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

$paginationContainer.addEventListener('click', async e => {
  if (!e.target.matches('.pagination-li')) return;

  console.log(e.target.textContent);

  const fetchItems = async () => {
    try {
      currentPageNumber = +e.target.textContent;
      const res = await fetch(`http://localhost:3000/product/${currentPageNumber}`);
      console.log(res);
      const res2 = await res.json();
      lastPageNumber = res2.lastPage;
      items = res2.products;
    } catch (e) {
      const $error = document.createElement('div');
      $error.textContent = "Couldn't find the server.";
      $error.classList.add('error-elem');

      $shoppingContainer.replaceWith($error);
      console.log(e);
    }
  };
  await fetchItems();
  renderProduct(document.querySelector('.items'), items);
  renderPagination(+e.target.textContent, lastPageNumber, $paginationContainer);
});
