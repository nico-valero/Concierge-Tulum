// Dragging carousel
const carousel = document.querySelector('.carousel');

let isDragging = false;
let startX;
let scrollLeft;

const dragStart = (e) => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = 'grabbing';
    carousel.classList.add('dragging');
}

const dragEnd = () => {
    isDragging = false;
    carousel.style.cursor = 'grab';
    carousel.classList.remove('dragging');
}

const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.3; //scroll-fast
    carousel.scrollLeft = scrollLeft - walk;
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('mouseleave', dragEnd);
carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('touchend', dragEnd);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);
// End of dragging carousel

// Carousel arrow buttons
const arrowBtns = document.querySelectorAll('.carousel-wrapper i');
const firstCardWidth = carousel.querySelector('.carousel-card').offsetWidth;

arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
    });
});