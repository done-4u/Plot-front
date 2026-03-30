class ToggleDiv extends HTMLElement {
    static get observedAttributes() {
        return ["button-text"];
    }

    constructor() {
        super();
        this.isOpen = false;
    }

    connectedCallback() {
        const innerHTML = this.innerHTML;
        this.innerHTML = "";

        this.button = document.createElement("button");
        this.button.textContent = this.getAttribute("button-text") || "Toggle";

        this.content = document.createElement("div");
        this.content.innerHTML = innerHTML;
        this.content.style.display = "none";

        this.button.addEventListener("click", () => this.toggle());

        this.appendChild(this.button);
        this.appendChild(this.content);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "button-text" && this.button) {
            this.button.textContent = newValue;
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.content.style.display = this.isOpen ? "" : "none";
    }
}

customElements.define("toggle-div", ToggleDiv);
