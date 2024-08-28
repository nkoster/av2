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

document.addEventListener("DOMContentLoaded", highlightActiveLink);
document.addEventListener("htmx:afterSwap", highlightActiveLink);

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggle');
  const menu = document.getElementById('hamburger-menu');

  toggle.addEventListener('change', function() {
    if (toggle.checked) {
      menu.style.minHeight = '13rem';
    } else {
      menu.style.minHeight = '0';
    }
  });

});
