const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".card");
let currentIndex = 0;
let startY = 0;
let isDragging = false;

const scrollUp = () => {
  if (currentIndex === cards.length - 1) return;
  currentIndex = currentIndex + 1;
  updateCards();
};

const scrollDown = () => {
  if (currentIndex === 0) return;
  currentIndex = currentIndex - 1;
  updateCards();
};

const updateCards = () => {
  // dynamic gap for small and large screens
  const distanceMultiplier = window.innerWidth <= 600 ? 180 : 345;

  cards.forEach((card, index) => {
    card.style.transform = `translateY(${
      (index - currentIndex) * distanceMultiplier
    }px) scale(${1 - (Math.abs(currentIndex - index) / 10) * 3})`; // transform the card multiplied by the distance from current card

    card.style.opacity = 1 - Math.abs(currentIndex - index) / 1.6;

    if (index === currentIndex) {
      card.classList.add("current");
    }
  });
};

const startDrag = (e) => {
  startY = e.clientY;
  isDragging = true;
};

const dragMove = (e) => {
  if (!isDragging) return;
  const currentY = e.clientY;
};

const endDrag = (e) => {
  console.log(currentIndex);
  if (!isDragging) return;
  isDragging = false;

  const endY = e.clientY;
  const scrollDirection = endY - startY;

  if (scrollDirection < -10) {
    scrollUp();
  } else if (scrollDirection > 10) {
    scrollDown();
  }
};

carousel.addEventListener("mousedown", startDrag);
carousel.addEventListener("mousemove", dragMove);
carousel.addEventListener("mouseup", endDrag);

//for touch screens
carousel.addEventListener("touchstart", startDrag);
carousel.addEventListener("touchmove", dragMove);
carousel.addEventListener("touchend", endDrag);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    scrollDown();
  } else if (e.key === "ArrowDown") {
    scrollUp();
  }
});

updateCards();
