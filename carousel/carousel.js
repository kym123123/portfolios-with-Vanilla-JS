(function () {
  const state = {
    imageArr: [],
    imageNumbers: 5,
  };

  let currentPage = 1;
  const offset = -1200;

  const $slider = document.querySelector('.slider');
  const $prev = document.querySelector('.prev');
  const $next = document.querySelector('.next');
  const $pageCircles = document.querySelector('.page-circles');
  const $circlesArr = Array.from($pageCircles.children);

  const movePageTransition = () => {
    window.requestAnimationFrame(() => {
      $slider.style.transform = `translateX(${offset * currentPage}px)`;
    });
  };

  const renderActiveCircle = circles => circles.map(circle => circle.classList.toggle('active', +circle.textContent === currentPage));

  const pauseTransition = () => {
    $slider.style.transition = 'none';
    movePageTransition();

    setTimeout(() => {
      $slider.style.transition = '0.2s all';
    });
  };

  const clickPageCircle = clickedCircle => {
    const pageNumber = +clickedCircle.textContent;
    currentPage = pageNumber;
    movePageTransition();
    renderActiveCircle($circlesArr);
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderActiveCircle($circlesArr);
  });

  $next.addEventListener(
    'click',
    _.throttle(() => {
      currentPage++;
      movePageTransition();
    }, 300)
  );

  $prev.addEventListener(
    'click',
    _.throttle(() => {
      currentPage--;
      movePageTransition();
    }, 300)
  );

  $slider.addEventListener('transitionend', () => {
    if (currentPage >= state.imageNumbers + 1) {
      currentPage = 1;
      pauseTransition();
    }
    if (currentPage <= 0) {
      currentPage = state.imageNumbers;
      pauseTransition();
    }
    renderActiveCircle($circlesArr);
  });

  $pageCircles.addEventListener('click', e => {
    if (!e.target.matches('.page-circle')) return;
    clickPageCircle(e.target);
  });
})();
