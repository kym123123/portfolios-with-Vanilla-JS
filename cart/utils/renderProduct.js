const $itemTemplate = document.getElementById('item').content.firstElementChild;
const $newItemsNode = document.getElementById('items').content.firstElementChild;

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.firstElementChild.src = entry.target.firstElementChild.dataset.src;
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback, options);

const getNewProductNode = product => {
  const $newProductNode = $itemTemplate.cloneNode(true);
  const $imgNode = $newProductNode.querySelector('.item-img');
  const $nameNode = $newProductNode.querySelector('.item-name');
  const $priceNode = $newProductNode.querySelector('.item-price');

  $newProductNode.classList.add(product._id);
  $imgNode.setAttribute('data-src', product.imageUrl);
  $imgNode.setAttribute('src', './imgs/loader.gif');
  $nameNode.textContent = product.name;
  $priceNode.textContent = '$' + product.price;

  return $newProductNode;
};

const renderProducts = products => {
  const $newUlNode = $newItemsNode.cloneNode(true);
  $newUlNode.classList.add('slideLeftIn');
  products.map(getNewProductNode).forEach(product => {
    observer.observe(product);
    $newUlNode.appendChild(product);
  });

  console.log($newUlNode);
  return $newUlNode;
};

export default (targetNode, products) => {
  console.log(targetNode, 'target');
  targetNode.classList.remove('slideLeftIn');
  targetNode.classList.add('slideLeftOut');
  targetNode.addEventListener('animationend', () => {
    targetNode.replaceWith(renderProducts(products));
  });
};
