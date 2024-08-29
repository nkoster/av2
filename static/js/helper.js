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
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('hamburger-menu');

  toggle.addEventListener('change', function() {
    if (toggle.checked) {
      menu.style.minHeight = '13rem';
      hamburger.style.rotate = '-90deg';
    } else {
      menu.style.minHeight = '0';
      hamburger.style.rotate = '0deg';
    }
  });

});

window.myLoadingCheck = false;
window.addEventListener('resize', function() {
  if (!myLoadingCheck) {
    window.myLoadingCheck = true;
    setTimeout(() => {
      console.log('reload');
      window.location.reload();
      window.myLoadingCheck = false;
    }, 1000);
  }

});
