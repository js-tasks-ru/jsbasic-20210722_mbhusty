import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.activeIndex = 0;
    this.slides = slides;
    this.elem = this.render(slides);
  }

  render(slides) {
    let carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.getSlidesList(slides)}
        </div>
      </div>`
    );

    let arrowRight = carousel.querySelector(".carousel__arrow_right");
    let arrowLeft = carousel.querySelector(".carousel__arrow_left");

    this.setArrow(this.activeIndex, arrowRight, arrowLeft, this.slides.length);

    arrowRight.addEventListener("click", () => {
      let carouselInnerWidth = carousel.querySelector(".carousel__inner").offsetWidth;
      this.activeIndex++;
      document.querySelector(".carousel__inner").style.transform = `translateX(-${this.activeIndex * carouselInnerWidth}px)`;
      this.setArrow(this.activeIndex, arrowRight, arrowLeft, this.slides.length);
    });

    arrowLeft.addEventListener("click", () => {
      let carouselInnerWidth = carousel.querySelector(".carousel__inner").offsetWidth;
      this.activeIndex--;
      document.querySelector(".carousel__inner").style.transform = `translateX(-${this.activeIndex * carouselInnerWidth}px)`;
      this.setArrow(this.activeIndex, arrowRight, arrowLeft, this.slides.length);
    });

    let buttonAdd = carousel.getElementsByClassName('carousel__button');

    for (let button of buttonAdd) {
      button.addEventListener('click', () => {
        carousel.dispatchEvent(new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true
        }));
      });
    }

    return carousel;
  }

  getSlidesList(slides) {
    return slides.reduce((resultList, item) => {
      return resultList + `
        <div class="carousel__slide" data-id=${item.id}>
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`;
    }, '');
  }

  setArrow(activeIndex, arrowRight, arrowLeft, countSlide) {
    if (activeIndex === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (activeIndex >= countSlide - 1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  }
}
