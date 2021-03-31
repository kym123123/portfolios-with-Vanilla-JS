const requestAddCart = async e => {
  if (!(e.target.matches('.item-add-cart') || e.target.matches('.fa-cart-plus'))) return;

  const targetLi = e.target.closest('li').cloneNode(true);
  const product_id = e.target.closest('li').classList[1];
  const number_of_product = targetLi.querySelector('.item-number').textContent;
  const name = targetLi.querySelector('.item-name').textContent;
  const price = +targetLi.querySelector('.item-price').textContent.substring(1);
  const imageUrl = targetLi.querySelector('.item-img').getAttribute('src');

  console.log(price);
  console.log(number_of_product);
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ number_of_product, name, price, imageUrl }),
  };
  const res = await fetch(`http://localhost:3000/mycart/add/${product_id}`, option);
  const res2 = await res.json();

  e.target.closest('li').querySelector('.item-number').textContent = '1';
  e.target.closest('li').querySelector('.item-decrease').disabled = true;
};

const requestGetCart = async (e, array) => {
  const res = await fetch('http://localhost:3000/mycart');
  const cartItems = await res.json();
  array = cartItems;

  return array;
};

export { requestAddCart, requestGetCart };
