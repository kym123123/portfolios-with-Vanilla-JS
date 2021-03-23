import addNewItemNodes from './utils/addNewItemNodes.js';
import addSpinner from './utils/addSpinner.js';

document.addEventListener('DOMContentLoaded', async () => {
  let items = [];
  let newItems = [];
  let postId = 1;
  let lastItem = 10;
  const $items = document.querySelector('.items');

  const fetchNextItems = async postId => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    newItems = await res.json();
    items = [...items, ...newItems];
  };

  const callback = (entries, observer) => {
    if (entries[0].isIntersecting && postId <= lastItem) {
      window.requestAnimationFrame(() => {
        $items.appendChild(addSpinner());
        fetchNextItems(postId++);

        setTimeout(() => {
          window.requestAnimationFrame(() => {
            document.querySelector('.spinner-container').replaceWith(addNewItemNodes(newItems, observer));
          });
        }, 2000);
      });
    }
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  const observer = new IntersectionObserver(callback, options);

  await fetchNextItems(postId++);

  window.requestAnimationFrame(() => {
    $items.appendChild(addNewItemNodes(newItems, observer));
  });
});
