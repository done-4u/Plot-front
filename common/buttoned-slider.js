export class ButtonedSlider extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const min = this.getAttribute("min") || 0;
        const max = this.getAttribute("max") || 100;
        const value = this.getAttribute("value") || 50;

        this.innerHTML = `
            <button type="button" class="first-button"><<</button>
            <button type="button" class="minus-button">-</button>
            <input type="range" class="slider" min="${min}" max="${max}" value="${value}" step="1">
            <button type="button" class="plus-button">+</button>
            <button type="button" class="last-button">>></button>
            <span class="value-display">${value}</span>
        `;

        const slider = this.getElementsByClassName("slider")[0];
        const display = this.getElementsByClassName("value-display")[0];

        const first_button = this.getElementsByClassName("first-button")[0];
        const last_button = this.getElementsByClassName("last-button")[0];
        const minus_button = this.getElementsByClassName("minus-button")[0];
        const plus_button = this.getElementsByClassName("plus-button")[0];

        const update = () => {
            display.innerText = slider.value;
            this.setAttribute("value", slider.value);
        };

        // TODO: instead of first/last button, implement 'step' button
        first_button.addEventListener("click", () => {
            slider.value = slider.min;
            update();
        });

        last_button.addEventListener("click", () => {
            slider.value = slider.max;
            update();
        });

        minus_button.addEventListener("click", () => {
            if (Number(slider.value) > Number(slider.min)) {
                slider.value = Number(slider.value) - 1;
                update();
            }
        });

        plus_button.addEventListener("click", () => {
            if (Number(slider.value) < Number(slider.max)) {
                slider.value = Number(slider.value) + 1;
                update();
            }
        });

        slider.addEventListener("input", update);
    }
}

customElements.define("buttoned-slider", ButtonedSlider);
