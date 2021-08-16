function initCarousel() {
  let carousel = document.querySelector(".carousel");
  let carouselInner = document.querySelector(".carousel__inner");
  let carouselArrowRight = document.querySelector(".carousel__arrow_right");
  let carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  let carouselSlide = document.querySelector(".carousel__slide");

  let slideQuantity = carouselInner.children.length;
  let counter = 1;

  if (counter === 1) {
    carouselArrowLeft.setAttribute("style", "display: none");
  }
  if (slideQuantity === 1) {
    carouselArrowLeft.setAttribute("style", "display: none");
    carouselArrowRight.setAttribute("style", "display: none");
  }

  carousel.addEventListener("click", function (event) {
    let slideWidth = carouselSlide.offsetWidth;

    if (event.target.closest(".carousel__arrow_right")) {
      carouselInner.setAttribute(
        "style",
        `transform: translateX(${-slideWidth * counter}px)`
      );

      counter++;

      if (counter === slideQuantity) {
        carouselArrowRight.setAttribute("style", "display: none");
        counter--;
      }

      carouselArrowLeft.removeAttribute("style");
    }

    if (event.target.closest(".carousel__arrow_left")) {
      counter--;
      carouselInner.setAttribute(
        "style",
        `transform: translateX(${-slideWidth * counter}px)`
      );

      carouselArrowRight.removeAttribute("style");
    }

    if (counter === 0) {
      carouselArrowLeft.setAttribute("style", "display: none");
      counter++;
    }
  });
}
