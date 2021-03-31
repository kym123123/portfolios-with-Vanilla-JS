import addNewItemNodes from './utils/addNewItemNodes.js';
import addSpinner from './utils/addSpinner.js';
import addNotification from './utils/addNotification.js';

document.addEventListener('DOMContentLoaded', async () => {
  let items = [];
  let newItems = [];
  let postId = 1;
  let lastItem = 5;
  const $items = document.querySelector('.items');

  const fetchNextItems = async postId => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    newItems = await res.json();
    items = [...items, ...newItems];
  };

  const callback = (entries, observer) => {
    if (entries[0].isIntersecting && postId <= lastItem) {
      window.requestAnimationFrame(() => {
        const $spinner = addSpinner();
        $items.appendChild($spinner);
        fetchNextItems(postId++);

        setTimeout(() => {
          window.requestAnimationFrame(() => {
            $spinner.replaceWith(addNewItemNodes(newItems, observer));
          });
        }, 1500);
      });
    } else if (entries[0].isIntersecting && postId > lastItem) {
      window.requestAnimationFrame(() => {
        const $notification = addNotification();
        $items.appendChild($notification);
        setTimeout(() => {
          $notification.classList.add('none');

          $notification.addEventListener('transitionend', () => {
            window.requestAnimationFrame(() => {
              $notification.remove();
              $notification.classList.remove('none');
            });
          });
        }, 1500);
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
