class ControllableInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    get value() {
        const input = this.getElementsByTagName("input")[0];
        return input ? input.value : this.getAttribute("value") || "";
    }

    set value(newValue) {
        this.setAttribute('value', newValue);
        const input = this.getElementsByTagName("input")[0];
        if (input) {
            input.value = newValue;
        }
    }

    static get observedAttributes() {
        return ["value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const input = this.querySelector('input');
        if (input && name === "value") {
            input.value = newValue;
        }
    }

    render() {
        const initialValue = this.getAttribute("value") || "";

        this.innerHTML = `
            <input type="text" value="${initialValue}" disabled>
            <button class="edit-button">Edit</button>
            <button class="submit-button" style="display: none;">Submit</button>
        `;
    }

    setupListeners() {
        const input = this.getElementsByTagName("input")[0];
        const edit_button = this.getElementsByClassName("edit-button")[0];
        const submit_button = this.getElementsByClassName("submit-button")[0];

        edit_button.addEventListener("click", () => {
            input.disabled = false;
            input.focus();
            edit_button.style.display = "none";
            submit_button.style.display = "";
        });

        submit_button.addEventListener("click", () => {
            input.disabled = true;
            submit_button.style.display = "none";
            edit_button.style.display = "";
            // sync the attribute back to the element
            this.setAttribute("value", input.value);
        });
    }
}

customElements.define("controllable-input", ControllableInput);
