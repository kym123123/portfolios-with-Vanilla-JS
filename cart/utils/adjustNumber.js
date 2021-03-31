const adjustItemNumber = e => {
  if (!(e.target.matches('.item-increase') || e.target.matches('.item-decrease'))) return;

  if (e.target.matches('.item-increase')) {
    const number = +e.target.nextElementSibling.textContent;
    e.target.nextElementSibling.textContent = number + 1;
    if (+e.target.nextElementSibling.textContent > 1) {
      e.target.nextElementSibling.nextElementSibling.disabled = false;
      e.target.nextElementSibling.nextElementSibling.classList.remove('disabled');
    }
    return;
  }
  const number = +e.target.previousElementSibling.textContent;
  e.target.previousElementSibling.textContent = number - 1;
  if (+e.target.previousElementSibling.textContent === 1) {
    e.target.disabled = true;
    e.target.classList.add('disabled');
  }
};

const adjustCartNumber = async e => {
  if (!(e.target.matches('.cart-item-increase') || e.target.matches('.cart-item-decrease'))) return;

  const $targetLi = e.target.closest('li');
  const $number = $targetLi.querySelector('.cart-item-number');
  const $increase = $targetLi.querySelector('.cart-item-increase');
  const $decrease = $targetLi.querySelector('.cart-item-decrease');
  const product_id = $targetLi.classList[1];
  const number = +$number.textContent;
  if (e.target.matches('.cart-item-increase')) {
    $number.textContent = number + 1;
    if (+$number.textContent > 1) {
      $decrease.disabled = false;
      $decrease.classList.remove('disabled');
    }
  } else {
    $number.textContent = number - 1;
    if (+$number.textContent === 1) {
      $decrease.disabled = true;
      $decrease.classList.add('cart-disabled');
    }
  }
  const res = await fetch(`http://localhost:3000/mycart/edit/${product_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ number_of_product: +$number.textContent }),
  });
  const res2 = await res.json();
  console.log(res2);
  return res2;
};

export { adjustItemNumber, adjustCartNumber };
