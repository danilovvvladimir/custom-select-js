const getTemplate = () => {
  return `
  <div class="select__input">
            <span>Hello select</span>
            <div class="select__input-img">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M169.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 274.7 54.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                />
              </svg>
            </div>
          </div>
          <div class="select__dropdown">
            <ul class="select__list">
              <li class="select__item">123</li>
              <li class="select__item">123</li>
              <li class="select__item">123</li>
              <li class="select__item">123</li>
              <li class="select__item">123</li>
              <li class="select__item">123</li>
              <li class="select__item">123</li>
              <li class="select__item">123</li>
            </ul>
          </div>`;
};

export class Select {
  constructor(selector, options) {
    this.el = document.querySelector(selector);
    this.#render();
    this.#setup();
  }

  #render() {
    this.el.classList.add("select");
    this.el.innerHTML = getTemplate();
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.el.addEventListener("click", this.clickHandler);
  }

  clickHandler(event) {
    console.log(event);
  }

  open() {
    this.el.classList.add("open");
  }
  close() {
    this.el.classList.remove("open");
  }

  destroy() {
    this.el.removeEventListener("click", this.clickHandler);
  }
}
