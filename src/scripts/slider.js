export function initializeSliders(selector) {
  const sliders = document.querySelectorAll(selector);
  sliders.forEach((slider) => {
    const wrapper = slider;
    const carousel = wrapper?.querySelector(".carousel");
    const arrowBtns = wrapper?.querySelectorAll(".btn");
    const card = carousel?.querySelector(".card");
    const firstCardWidth = card ? card.offsetWidth : null;

    if (carousel && arrowBtns && firstCardWidth) {
        const carouselChildrens = [...carousel.children];
    
        let isDraggin = false,
          startX,
          startScrollLeft,
          timeoutId;
        let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    
        carouselChildrens
          .slice(-cardPerView)
          .reverse()
          .forEach((card) => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
          });
    
        carouselChildrens.slice(0, cardPerView).forEach((card) => {
          carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });
    
        arrowBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            carousel.scrollLeft +=
              btn.id === "left" ? -firstCardWidth : firstCardWidth;
          });
        });
    
        const dragStart = (e) => {
          isDraggin = true;
          carousel.classList.add("dragging");
          startX = e.pageX;
          startScrollLeft = carousel.scrollLeft;
        };
    
        const dragging = (e) => {
          if (!isDraggin) return;
          carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        };
    
        const dragStop = () => {
          isDraggin = false;
          carousel.classList.remove("dragging");
        };
    
        const autoPlay = () => {
          if (window.innerWidth < 800) return;
          timeoutId = setTimeout(
            () => (carousel.scrollLeft += firstCardWidth),
            2500,
          );
        };
    
        autoPlay();
    
        const infiniteScroll = () => {
          if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
            carousel.classList.remove("no-transition");
          } else if (
            Math.ceil(carousel.scrollLeft) ===
            carousel.scrollWidth - carousel.offsetWidth
          ) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
          }
          clearTimeout(timeoutId);
          if (!wrapper.matches(":hover")) autoPlay();
        };
    
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        carousel.addEventListener("mouseleave", autoPlay);
      } else {
        return;
      }
    
    });

}


/* document.addEventListener("astro:after-page-update", () => {
    initializeSliders();
  }); */