export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.elem.querySelector(".slider__thumb").addEventListener("pointerdown", this.onPointerDown);
    this.elem.addEventListener("click", this.onClick);
  }

  render = () => {
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.elem.innerHTML = `
    <div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      <span class="slider__step-active" ></span>
    </div>
    `;

    for (let i = 0; i < this.steps - 1 ;i++) {
      this.elem.querySelector(".slider__steps").innerHTML += "<span></span>";
    }
    this.findSpan = this.value;
    this.percentageSlider = (this.value / (this.steps - 1)) * 100 ;
    this.elem.querySelector('.slider__thumb').style.left = `${this.percentageSlider}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.percentageSlider}%`;
    this.elem.querySelector(".slider__value").innerHTML = this.findSpan;
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

  onPointerDown = () => {

    this.elem.querySelector('.slider__thumb').ondragstart = () => false;
    this.elem.classList.add("slider_dragging");

    let forMove = (event) => {


      for (let i of this.elem.querySelector(".slider__steps").children) {
        i.classList.remove("slider__step-active");
      }


      let stepSlider = this.elem.getBoundingClientRect().width / (this.steps - 1);
      let mouseX = event.pageX - this.elem.getBoundingClientRect().x;


      if (0 < mouseX && this.elem.getBoundingClientRect().width > mouseX) {
        this.findSpan = Math.round(mouseX / stepSlider);

        this.elem.querySelector(".slider__steps").children[this.findSpan].classList.add("slider__step-active");

        this.percentageSlider = 100 / (this.steps - 1) * this.findSpan;

        this.elem.querySelector('.slider__thumb').style.left = `${mouseX / this.elem.getBoundingClientRect().width * 100}%`;
        this.elem.querySelector('.slider__progress').style.width = `${mouseX / this.elem.getBoundingClientRect().width * 100}%`;

        this.elem.querySelector(".slider__value").innerHTML = this.findSpan;
      }
    };

    document.documentElement.addEventListener("pointermove", forMove);


    let forPointerUp = () => {

      document.documentElement.removeEventListener("pointermove", forMove);
      this.elem.querySelector('.slider__thumb').style.left = `${this.percentageSlider}%`;
      this.elem.querySelector('.slider__progress').style.width = `${this.percentageSlider}%`;
      this.elem.querySelector(".slider__value").innerHTML = this.findSpan;
      this.elem.classList.remove("slider_dragging");

      console.log(this.elem.querySelector('.slider__progress').style.width, this.elem.querySelector('.slider__thumb').style.left);

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.findSpan,
        bubbles: true
      }));
    };
    document.documentElement.addEventListener("pointerup", forPointerUp);
  }
}
