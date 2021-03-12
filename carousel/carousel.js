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
  const $start = document.querySelector('.start-button');
  const $stop = document.querySelector('.stop-button');

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

  // 자동 슬라이드 함수
  const startSlidePageAutomatically = () => {
    currentPage++;
    movePageTransition();
    renderActiveCircle($circlesArr);
  };

  // 자동 슬라이드 멈추기
  const stopSlidePageAutomatically = timerId => {
    clearInterval(timerId);

    $stop.classList.add('active');
    $start.classList.remove('active');
  };

  // next, prev 버튼을 누르고 화면 전환이 된 후로 다시 3초이후에 자동 슬라이드 되도록 하는 함수
  const delaySlidePageAutomatically = timerId => {
    clearTimeout(timerId);
    timerId = setInterval(startSlidePageAutomatically, 3500);
    return timerId;
  };

  document.addEventListener('DOMContentLoaded', () => {
    let timerId = setInterval(startSlidePageAutomatically, 3500);

    renderActiveCircle($circlesArr);

    $start.addEventListener('click', () => {
      if ($start.classList.contains('active')) return;

      $start.classList.add('active');
      $stop.classList.remove('active');
      timerId = setInterval(startSlidePageAutomatically, 3500);
    });

    $stop.addEventListener('click', () => {
      stopSlidePageAutomatically(timerId);
    });

    $next.addEventListener(
      'click',
      _.throttle(() => {
        if ($start.classList.contains('active')) {
          timerId = delaySlidePageAutomatically(timerId);
        }
        currentPage++;
        movePageTransition();
      }, 300)
    );

    $prev.addEventListener(
      'click',
      _.throttle(() => {
        if ($start.classList.contains('active')) {
          timerId = delaySlidePageAutomatically(timerId);
        }
        currentPage--;
        movePageTransition();
      }, 300)
    );

    $pageCircles.addEventListener('click', e => {
      if (!e.target.matches('.page-circle')) return;
      if ($start.classList.contains('active')) {
        timerId = delaySlidePageAutomatically(timerId);
      }
      clickPageCircle(e.target);
    });
  });

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
})();
