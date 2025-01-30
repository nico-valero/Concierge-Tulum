// Dragging carousel
const carousel = document.querySelector('.carousel');
const rentalsCarousel = document.querySelector('.rentals-carousel');

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
carousel.addEventListener('touchmove', dragging, { passive: false });

// Dragging rentals carousel
const dragStartRentals = (e) => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX - rentalsCarousel.offsetLeft;
    scrollLeft = rentalsCarousel.scrollLeft;
    rentalsCarousel.style.cursor = 'grabbing';
    rentalsCarousel.classList.add('dragging');
}

const dragEndRentals = () => {
    isDragging = false;
    rentalsCarousel.style.cursor = 'grab';
    rentalsCarousel.classList.remove('dragging');
}

const draggingRentals = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - rentalsCarousel.offsetLeft;
    const walk = (x - startX) * 1.3; //scroll-fast
    rentalsCarousel.scrollLeft = scrollLeft - walk;
}

rentalsCarousel.addEventListener('mousedown', dragStartRentals);
rentalsCarousel.addEventListener('touchstart', dragStartRentals);
rentalsCarousel.addEventListener('mouseleave', dragEndRentals);
rentalsCarousel.addEventListener('mouseup', dragEndRentals);
rentalsCarousel.addEventListener('touchend', dragEndRentals);
rentalsCarousel.addEventListener('mousemove', draggingRentals);
rentalsCarousel.addEventListener('touchmove', draggingRentals, { passive: false });

// Carousel arrow buttons
const arrowBtns = document.querySelectorAll('.carousel-wrapper i');
const firstCardWidth = carousel.querySelector('.carousel-card').offsetWidth;

arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const isRentals = btn.parentElement.querySelector('.rentals-carousel');
        const targetCarousel = isRentals ? rentalsCarousel : carousel;
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