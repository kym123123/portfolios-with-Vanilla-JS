import displayAddedCart from './displayAddedCart.js';

const requestAddCart = async e => {
  if (!(e.target.matches('.item-add-cart') || e.target.matches('.fa-cart-plus'))) return;

  const targetLi = e.target.closest('li').cloneNode(true);
  const product_id = e.target.closest('li').classList[1];
  const number_of_product = targetLi.querySelector('.item-number').textContent;
  const name = targetLi.querySelector('.item-name').textContent;
  const price = +targetLi.querySelector('.item-price').textContent.substring(1);
  const imageUrl = targetLi.querySelector('.item-img').getAttribute('src');

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ number_of_product, name, price, imageUrl }),
  };
  const res = await fetch(`http://localhost:3000/mycart/add/${product_id}`, option);

  const $closestLi = e.target.closest('li');

  $closestLi.querySelector('.item-number').textContent = '1';
  $closestLi.querySelector('.item-decrease').disabled = true;
  $closestLi.querySelector('.item-decrease').classList.add('disabled');

  displayAddedCart($closestLi.querySelector('.item-add-cart')); // added cart! 표시
};

const requestGetCart = async (e, array) => {
  const res = await fetch('http://localhost:3000/mycart');
  const cartItems = await res.json();
  array = cartItems;

  return array;
};

export { requestAddCart, requestGetCart };
