const $itemTemplate = document.getElementById('item').content.firstElementChild;
const $newItemsNode = document.getElementById('items').content.firstElementChild;

const getNewProductNode = product => {
  const $newProductNode = $itemTemplate.cloneNode(true);
  const $imgNode = $newProductNode.querySelector('.item-img');
  const $nameNode = $newProductNode.querySelector('.item-name');
  const $priceNode = $newProductNode.querySelector('.item-price');
  const $numberNode = $newProductNode.querySelector('.item-number');

  $newProductNode.classList.add(product._id);
  $imgNode.setAttribute('src', product.imageUrl);
  $nameNode.textContent = product.name;
  $priceNode.textContent = '$' + product.price;

  return $newProductNode;
};

const renderProducts = products => {
  const $newFragNode = document.createDocumentFragment();
  products.map(getNewProductNode).forEach(product => $newFragNode.appendChild(product));

  return $newFragNode;
};

export default (parentNode, products) => {
  parentNode.appendChild(renderProducts(products));
};
