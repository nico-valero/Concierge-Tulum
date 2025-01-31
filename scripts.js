// Dragging carousel
const carousel = document.querySelector('.carousel');
const rentalsCarousel = document.querySelector('.rentals-carousel');
const restaurantsCarousel = document.querySelector('.restaurants-carousel');

let isDragging = false;
let startX;
let scrollLeft;

const dragStart = (e, targetCarousel) => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX - targetCarousel.offsetLeft;
    scrollLeft = targetCarousel.scrollLeft;
    targetCarousel.style.cursor = 'grabbing';
    targetCarousel.classList.add('dragging');
}

const dragEnd = (targetCarousel) => {
    isDragging = false;
    targetCarousel.style.cursor = 'grab';
    targetCarousel.classList.remove('dragging');
}

const dragging = (e, targetCarousel) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - targetCarousel.offsetLeft;
    const walk = (x - startX) * 1.3; //scroll-fast
    targetCarousel.scrollLeft = scrollLeft - walk;
}

const addDragEvents = (targetCarousel) => {
    targetCarousel.addEventListener('mousedown', (e) => dragStart(e, targetCarousel));
    targetCarousel.addEventListener('touchstart', (e) => dragStart(e, targetCarousel));
    targetCarousel.addEventListener('mouseleave', () => dragEnd(targetCarousel));
    targetCarousel.addEventListener('mouseup', () => dragEnd(targetCarousel));
    targetCarousel.addEventListener('touchend', () => dragEnd(targetCarousel));
    targetCarousel.addEventListener('mousemove', (e) => dragging(e, targetCarousel));
    targetCarousel.addEventListener('touchmove', (e) => dragging(e, targetCarousel), { passive: false });
}

addDragEvents(carousel);
addDragEvents(rentalsCarousel);
addDragEvents(restaurantsCarousel);

// Carousel arrow buttons
const arrowBtns = document.querySelectorAll('.carousel-wrapper i');
const firstCardWidth = carousel.querySelector('.carousel-card').offsetWidth;

arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const isRentals = btn.parentElement.querySelector('.rentals-carousel');
        const isRestaurants = btn.parentElement.querySelector('.restaurants-carousel');
        const targetCarousel = isRentals ? rentalsCarousel : (isRestaurants ? restaurantsCarousel : carousel);
        targetCarousel.scrollLeft += btn.id.includes('left') ? -firstCardWidth * 2 : firstCardWidth * 2;
    });
});

// Smooth scrolling for navbar links
const navbarLinks = document.querySelectorAll('.navbar-menu a');

navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 100, // Adjust the offset for fixed navbar
            behavior: 'smooth'
        });
    });
});

// Navbar toggle for mobile
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navbarIcon = navbarToggle.querySelector('i');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    navbarIcon.classList.toggle('ri-menu-line');
    navbarIcon.classList.toggle('ri-close-line');
});