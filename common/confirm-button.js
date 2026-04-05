export class ConfirmButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();

        this.addEventListener("click", (event) => {
            const message = this.getAttribute("message") || "Are you sure?";
            if (!confirm(message)) {
                event.stopImmediatePropagation();
                event.preventDefault();
            }
        }, true);
    }

    render() {
        const originalContent = this.innerHTML;
        this.innerHTML = `<button type="button">${originalContent}</button>`;
    }
}

customElements.define("confirm-button", ConfirmButton);
