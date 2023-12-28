const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleMobileViewChange(mediaQuery) {
  const scrollDownElement = document.querySelector(".scroll-down");
  if (scrollDownElement && mediaQuery.matches) {
    scrollDownElement.style.display = "none";
  } else if (scrollDownElement) {
    scrollDownElement.style.display = "block";
  }
}

mediaQuery.addEventListener("change", handleMobileViewChange);
handleMobileViewChange(mediaQuery);
