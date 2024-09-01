mainElement = document.querySelector('main');
orangeBar = document.querySelector('.orange-bar');
hamburgerMenu = document.getElementById('hamburger-menu');
header = document.querySelector('header');

function highlightActiveLink() {

  const navLinks = document.querySelectorAll('header nav a');
  const hamburgerLinks = document.querySelectorAll('#hamburger-menu a');
  const currentURL = window.location.pathname;

  console.log('Current URL:', currentURL);

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

function toggleMenu() {
  const toggle = document.getElementById('toggle');
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('hamburger-menu');

  let toggleState = localStorage.getItem('toggleState') || 'false';
  if (toggleState === 'true') {
    toggle.checked = true;
    menu.style.minHeight = '13rem';
    hamburger.style.rotate = '-90deg';
  } else {
    toggle.checked = false;
    menu.style.maxHeight = '0';
    menu.style.minHeight = '0';
    hamburger.style.rotate = '0deg';
  }
}

document.addEventListener("DOMContentLoaded", highlightActiveLink);
document.addEventListener("htmx:afterSwap", highlightActiveLink);

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggle');
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('hamburger-menu');

  toggleMenu();

  toggle.addEventListener('change', function() {
    if (toggle.checked) {
      localStorage.setItem('toggleState', 'true');
      menu.style.minHeight = '13rem';
      hamburger.style.rotate = '-90deg';
    } else {
      localStorage.setItem('toggleState', 'false');
      menu.style.maxHeight = '0';
      menu.style.minHeight = '0';
      hamburger.style.rotate = '0deg';
    }
  });

});

window.addEventListener('resize', function() {
    setTimeout(() => {
      window.location.reload();}, 1);
});

function logScrollPosition() {

  if (window.location.pathname !== '/producten') {
    return;
  }

  // console.log('Scroll', mainElement.scrollTop);
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

  toggleMenu();

  const scrollPosition = localStorage.getItem('scrollPosition');
  // console.log('Restoring scroll position:', scrollPosition);
  mainElement.scrollTo({
    top: parseInt(scrollPosition),
    behavior: 'smooth'
  })
}
