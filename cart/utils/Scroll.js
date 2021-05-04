const $scrollUpContainer = document.getElementById('scroll-up').content.firstElementChild;

export default () => {
  const $newScrollUpContainer = $scrollUpContainer.cloneNode(true);
  $newScrollUpContainer.classList.add('appear');

  const attachAppear = () => $newScrollUpContainer.classList.remove('appear');

  $newScrollUpContainer.addEventListener('animationend', attachAppear);

  $newScrollUpContainer.addEventListener('click', () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  });

  return $newScrollUpContainer;
};
