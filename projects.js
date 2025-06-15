document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card');
  let current = 0;

  function updateCarousel() {
    cards.forEach((card, index) => {
      card.classList.remove('left', 'center', 'right');
      card.style.opacity = '0';

      if (index === current) {
        card.classList.add('center');
        card.style.opacity = '1';
      } else if (index === (current - 1 + cards.length) % cards.length) {
        card.classList.add('left');
        card.style.opacity = '0.7';
      } else if (index === (current + 1) % cards.length) {
        card.classList.add('right');
        card.style.opacity = '0.7';
      }
    });
  }

  function moveNext() {
    current = (current + 1) % cards.length;
    updateCarousel();
  }

  function movePrev() {
    current = (current - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      moveNext();
    } else if (e.key === 'ArrowLeft') {
      movePrev();
    }
  });

  let scrollTimeout;
  document.addEventListener('wheel', (e) => {
    if (scrollTimeout) return; // debounce

    if (e.deltaY > 0) {
      moveNext();
    } else {
      movePrev();
    }

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
    }, 500); // adjust debounce delay
  });

  updateCarousel();
});

// Mobile swipe support
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const threshold = 50; // Minimum swipe distance in px
  if (touchEndX < touchStartX - threshold) {
    moveNext(); // swipe left
  }
  if (touchEndX > touchStartX + threshold) {
    movePrev(); // swipe right
  }
}

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});