export default carts => {
  if (!carts.length) return '';
  return '$' + carts.reduce((acc, cur) => acc + cur.price * cur.number_of_product, 0).toFixed(2);
};
