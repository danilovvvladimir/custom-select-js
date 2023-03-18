const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? "Выберите вариант";

  const items = data.map((item) => {
    let cls = "";
    if (item.id === selectedId) {
      text = item.value;
      cls = "selected";
    }
    return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`;
  });

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
        <div class="select__input-img data-type="arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M169.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 274.7 54.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
            />
          </svg>
        </div>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join("")}
      </ul>
    </div>`;
};

export class Select {
  constructor(selector, options) {
    this.el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.el.classList.add("select");
    this.el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.el.addEventListener("click", this.clickHandler);
    this.value = this.el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    this.toggle();
    if (type === "item") {
      const id = event.target.dataset.id;
      this.select(id);
    }
  }

  get isOpen() {
    return this.el.classList.contains("open");
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.value.textContent = this.current.value;

    this.el.querySelectorAll('[data-type="item"]').forEach((item) => {
      item.classList.remove("selected");
    });

    this.el.querySelector(`[data-id="${id}"]`).classList.add("selected");

    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.el.classList.add("open");
  }
  close() {
    this.el.classList.remove("open");
  }

  destroy() {
    this.el.removeEventListener("click", this.clickHandler);
    this.el.innerHTML = "";
  }
}
