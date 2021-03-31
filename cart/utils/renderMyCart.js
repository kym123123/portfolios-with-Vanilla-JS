const $newCartItemTemplate = document.getElementById('cart-item').content.firstElementChild;
const $cartEmpty = document.getElementById('cart-empty').content.firstElementChild;

const getNewCartItem = cartItem => {
  const $newCartItem = $newCartItemTemplate.cloneNode(true);
  const $newCartItemImg = $newCartItem.querySelector('.item-img');
  const $newCartItemName = $newCartItem.querySelector('.cart-item-name');
  const $newCartItemPrice = $newCartItem.querySelector('.cart-item-price');
  const $newCartItemNumber = $newCartItem.querySelector('.cart-item-number');
  const $newCartItemDecrease = $newCartItem.querySelector('.cart-item-decrease');

  $newCartItem.classList.add(cartItem.product_id);
  $newCartItemImg.src = cartItem.imageUrl;
  $newCartItemName.textContent = cartItem.name;
  $newCartItemPrice.textContent = '$' + cartItem.price;
  $newCartItemNumber.textContent = cartItem.number_of_product;
  $newCartItemDecrease.disabled = +cartItem.number_of_product > 1 ? false : true;

  return $newCartItem;
};

const appendNewCartItems = cartItems => {
  const $newFragNode = document.createDocumentFragment();

  if (!cartItems.length) {
    $newFragNode.appendChild($cartEmpty);

    return $newFragNode;
  }
  cartItems.map(getNewCartItem).forEach(cartItem => $newFragNode.appendChild(cartItem));

  return $newFragNode;
};

export default cartItems => {
  return appendNewCartItems(cartItems);
};
