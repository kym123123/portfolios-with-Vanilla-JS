export default (currentPage, lastPage, parentNode) => {
  const $newPaginationUl = document.createElement('ul');
  $newPaginationUl.classList.add('pagination-ul');

  for (let i = 1; i <= lastPage; i++) {
    const $li = document.createElement('li');
    $li.textContent = i;
    $li.classList.add('pagination-li');

    if (i === currentPage) $li.classList.add('current');

    $newPaginationUl.appendChild($li);
  }
  console.log('e');

  parentNode.replaceChild($newPaginationUl, parentNode.firstChild);
};
