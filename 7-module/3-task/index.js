export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.render(value);
    this.elem.addEventListener("click", this.onClick);
  }

  render = (value) => {
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.elem.innerHTML = `
    <div class="slider__thumb">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      <span class="slider__step-active" ></span>
    </div>
    `;

    for (let i = 0; i < this.steps - 1 ;i++) {
      this.elem.querySelector(".slider__steps").innerHTML += "<span></span>";
    }
  }

  onClick = (event) => {
    for (let i of this.elem.querySelector(".slider__steps").children) {
      i.classList.remove("slider__step-active");
    }

    let stepSlider = this.elem.getBoundingClientRect().width / (this.steps - 1);
    let mouseX = event.pageX - this.elem.getBoundingClientRect().x;
    let findSpan = Math.round(mouseX / stepSlider);

    this.elem.querySelector(".slider__steps").children[findSpan].classList.add("slider__step-active");

    let percentageSlider = 100 / (this.steps - 1) * findSpan;

    this.elem.querySelector('.slider__thumb').style.left = `${percentageSlider}%`;
    this.elem.querySelector('.slider__progress').style.width = `${percentageSlider}%`;

    this.elem.querySelector(".slider__value").innerHTML = findSpan;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: findSpan,
      bubbles: true
    }));
  }
}
