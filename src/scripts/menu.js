document.addEventListener("astro:page-load", (event) => {
  const toggleButton = document.getElementById("menu-toggle");
  const closeButton = document.getElementById("menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("translate-x-0");
    mobileMenu.classList.toggle("-translate-x-full");
  };

  toggleButton.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);

});
