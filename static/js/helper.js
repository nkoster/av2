function highlightActiveLink() {
  const navLinks = document.querySelectorAll('header nav a');
  const currentURL = window.location.pathname;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentURL) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", highlightActiveLink);
document.addEventListener("htmx:afterSwap", highlightActiveLink);
