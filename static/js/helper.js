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

function logScrollPosition() {

  if (window.location.pathname !== '/producten') {
    return;
  }

  localStorage.setItem('scrollPosition', mainElement.scrollTop.toString());
  if (mainElement.scrollTop > 60) {
    orangeBar.style.height = '0';
  } else {
    orangeBar.style.height = '2.5rem';
  }
}

mainElement.addEventListener('scroll', logScrollPosition);

var scrollInterval;

function startScrollInterval() {
  if (!scrollInterval) {
    scrollInterval = setInterval(restoreScrollPosition, 500);
  }
}

startScrollInterval();

function restoreScrollPosition() {
  if (window.location.pathname !== '/producten') {
    return;
  }
  const scrollPosition = localStorage.getItem('scrollPosition');
  mainElement.scrollTo({
    top: parseInt(scrollPosition),
    behavior: 'smooth'
  })
}
