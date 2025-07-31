// Fundo parallax
document.addEventListener('mousemove', (e) => {
  const bg = document.querySelector('.background');
  const offsetX = (e.clientX - window.innerWidth / 2) * 0.02;
  const offsetY = (e.clientY - window.innerHeight / 2) * 0.02;
  bg.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

// Carrossel
let index = 0;
const carousel = document.getElementById('carousel');

function updateCarousel() {
  const items = document.querySelectorAll('.carousel-item');
  items.forEach((item, i) => {
    item.style.transform = `translateX(${(i - index) * 100}%)`;
  });
}

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + carousel.children.length) % carousel.children.length;
  updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % carousel.children.length;
  updateCarousel();
});

// Loading
window.addEventListener('load', () => {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('content').style.display = 'block';
  updateCarousel();
});

// Menu Mobile
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('show');
});
