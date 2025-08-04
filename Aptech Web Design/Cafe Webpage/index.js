// Show message when 'Order Now' button is clicked
const orderNowButton = document.querySelector('.button.order-now');
if (orderNowButton) {
  orderNowButton.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Order Coming right up!');
  });
}

const navLinks = document.querySelectorAll('.nav-menu .nav-link');
const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');
const submitButton = document.querySelector('#form-submit');
const form = document.querySelector('#form');

// click to open mobile side view
menuOpenButton.addEventListener('click', () => {
  document.body.classList.toggle('show-mobile-menu');
});

// close mobile side view
menuCloseButton.addEventListener('click', () => menuOpenButton.click());

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    // close mobile side view
    if (document.body.classList.contains('show-mobile-menu')) {
      menuOpenButton.click();
    }
  });
});

// MAKE SWIPER FUNCTIONAL
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //   RESPONSIVE BREAKPOINTS
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Handle the form submission

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const message = form.elements['message'].value;

  alert(
    `Thank you, ${name}! Your message has been received. Expect a response at the email provided: ${email}`
  );

  form.reset();
});
