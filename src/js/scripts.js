const bodyStyle = document.body.style;
const header = document.querySelector('.section-header');
const headerActiveClass = 'section-header--active-nav';

const accardion = document.querySelector('.faq-accordion').addEventListener('click', (event) => {
    const accardionClassName = '.faq-accordion__item'
    if (event.target.closest(accardionClassName)) {
        event.target.closest(accardionClassName).classList
            .toggle('faq-accordion__item--active');
    }
})

const burger = document.querySelector('.btn-burger').addEventListener('click', (event) => {
    header.classList.toggle(headerActiveClass);
})

const headerListener = document.querySelector('.nav-wrapper').addEventListener('click', event => {
    const targetEl = event.target.classList;
    const activeClass = 'nav-wrapper__item-link--active';
    if (targetEl.contains('nav-wrapper__item-link')) {
        const activeEl = document.querySelector('.nav-wrapper__item-link--active');
        activeEl.classList.remove(activeClass);
        targetEl.add(activeClass);
    }
})

const resetNav = () => {
    header.classList.remove(headerActiveClass)
}

window.addEventListener('resize', resetNav)

new Swiper('.section-hero-image', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
});

new Swiper('.slider-wrapper', {
    loop: true,
    pagination: {
        el: '.blog-pagination.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

new Swiper('.slider-quotes-container', {
    // loop: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
        el: '.section-quotes .swiper-pagination',
        clickable: true
    },
});
