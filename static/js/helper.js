mainElement = document.querySelector('main');
orangeBar = document.querySelector('.orange-bar');
hamburgerMenu = document.getElementById('hamburger-menu');
header = document.querySelector('header');

function highlightActiveLink() {

  const navLinks = document.querySelectorAll('header nav a');
  const hamburgerLinks = document.querySelectorAll('#hamburger-menu a');
  const currentURL = window.location.pathname;

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentURL) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  hamburgerLinks.forEach(link => {
    if (link.getAttribute('href') === currentURL) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

}

document.addEventListener("htmx:afterSwap", () => {
  highlightActiveLink();
});

toggle = document.getElementById('toggle');
hamburger = document.querySelector('.hamburger');
menu = document.getElementById('hamburger-menu');

setTimeout(() => {
  toggle.checked = false;
  menu.style.maxHeight = '0';
  menu.style.minHeight = '0';
  hamburger.style.rotate = '0deg';
}, 300)

toggle.addEventListener('change', function() {
  if (toggle.checked) {
    menu.style.minHeight = '13rem';
    hamburger.style.rotate = '-90deg';
  } else {
    menu.style.maxHeight = '0';
    menu.style.minHeight = '0';
    hamburger.style.rotate = '0deg';
  }
});

highlightActiveLink();

function logScrollPos() {

  if (window.location.pathname === '/producten') {
    localStorage.setItem('scrollPosProducts', mainElement.scrollTop.toString());
  }

  if (window.location.pathname.startsWith('/product/')) {
    localStorage.setItem('scrollPosProduct', mainElement.scrollTop.toString());
  }

  if (mainElement.scrollTop > 60) {
    orangeBar.style.height = '0';
  } else {
    orangeBar.style.height = '2.5rem';
  }

}

mainElement.addEventListener('scroll', () => {
  logScrollPos();
});

var scrollInterval;

function startScrollInterval() {
  if (!scrollInterval) {
    scrollInterval = setInterval(() => {
      restoreScrollPosProducts();
      restoreScrollPosProduct();
    }, 500);
  }
}

startScrollInterval();

function restoreScrollPosProducts() {
  if (window.location.pathname !== '/producten') {
    return;
  }
  const scrollPosProducts = localStorage.getItem('scrollPosProducts');
  mainElement.scrollTo({
    top: parseInt(scrollPosProducts),
    behavior: 'smooth'
  })
}

function restoreScrollPosProduct() {
  if (!window.location.pathname.startsWith('/product/')) {
    return;
  }
  const scrollPosProduct = localStorage.getItem('scrollPosProduct');
  mainElement.scrollTo({
    top: parseInt(scrollPosProduct),
    behavior: 'smooth'
  })
}

if (window.location.pathname === '/') {
  var slides = document.querySelector('.slides');
  var slideElements = document.querySelectorAll('.slide');
  var totalSlides = slideElements.length;
  var slideIndex = 0;
  var slideWidth = slideElements[0].offsetWidth;

  function updateSlideWidth() {
    slideWidth = slideElements[0].offsetWidth;
  }

  window.addEventListener('resize', updateSlideWidth);

  function slideShow() {
    slideIndex++;
    slides.style.transition = "transform 1s ease";
    slides.style.transform = `translateX(${-slideIndex * slideWidth}px)`;

    if (slideIndex === totalSlides - 1) {
      setTimeout(() => {
        slides.style.transition = "none";
        slides.style.transform = "translateX(0)";
        slideIndex = 0;
      }, 1000);
    }
  }

  setInterval(slideShow, 10000);
}
