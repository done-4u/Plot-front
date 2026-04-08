import {ConfirmButton} from "/common/confirm-button.js"

export class ControllableForm extends HTMLElement {
    constructor() {
        super();
        this._isRendered = false;
        this._pendingButtons = [];
    }

    static get observedAttributes() {
        return ["inner-label-text", "inner-value", "inner-required"];
    }

    get innerLabelText() {
        const labelTextContainer = this.getElementsByTagName("span")[0];
        return labelTextContainer ? labelTextContainer.innerText : this.getAttribute("inner-label-text") || "";
    }

    set innerLabelText(newValue) {
        this.setAttribute("inner-label-text", newValue);
    }

    get innerValue() {
        const input = this.getElementsByTagName("input")[0];
        return input ? input.value : this.getAttribute("inner-value") || "";
    }

    set innerValue(newValue) {
        this.setAttribute("inner-value", newValue);
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
        this.syncAttributes();

        this._isRendered = true;
        this._processPendingButtons();
    }

    addDeleteButton(label = "Delete", onClick = null) {
        if (!this._isRendered) {
            this._pendingButtons.push({label, onClick});
            return;
        }

        const form = this.querySelector("form");
        if (form) {
            // TODO: use confirm-button
            const delete_button = document.createElement("button");
            delete_button.type = "button";
            delete_button.textContent = label;

            if (onClick) {
                delete_button.addEventListener("click", onClick);
            }

            form.appendChild(delete_button);
        }
    }

    _processPendingButtons() {
        while (this._pendingButtons.length > 0) {
            const {label, onClick} = this._pendingButtons.shift();
            this.addDeleteButton(label, onClick);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "inner-label-text") {
            const labelTextContainer = this.getElementsByTagName("span")[0];
            if (labelTextContainer) {
                labelTextContainer.innerText = newValue;
            }
        }

        const input = this.getElementsByTagName("input")[0];
        if (!input) return;

        if (name === "inner-value") {
            input.value = newValue;
        }

        if (name === "inner-required") {
            input.required = this.hasAttribute("inner-required");
        }
    }

    syncAttributes() {
        const labelTextContainer = this.getElementsByTagName("span")[0];
        if (labelTextContainer) {
            labelTextContainer.innerText = this.getAttribute("inner-label-text") || "";
        }

        const input = this.querySelector("input");
        if (input) {
            input.value = this.getAttribute("inner-value") || "";
            input.required = this.hasAttribute("inner-required");
        }
    }

    render() {
        const initialValue = this.getAttribute("inner-value") || "";
        const initialRequired = this.hasAttribute("inner-required") ? "required" : "";

        this.innerHTML = `
            <form>
                <label>
                    <span></span>
                    <input type="text" value="${initialValue}" ${initialRequired} disabled>
                </label>
                <button type="button" class="edit-button">Edit</button>
                <button type="submit" class="submit-button" style="display: none;">Submit</button>
            </form>
        `;
    }

    setupListeners() {
        const form = this.getElementsByTagName("form")[0];
        const input = this.getElementsByTagName("input")[0];
        const edit_button = this.getElementsByClassName("edit-button")[0];
        const submit_button = this.getElementsByClassName("submit-button")[0];

        if (!form || !edit_button || !submit_button) return;

        edit_button.addEventListener("click", () => {
            input.disabled = false;
            input.focus();
            edit_button.style.display = "none";
            submit_button.style.display = "";
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            input.disabled = true;
            submit_button.style.display = "none";
            edit_button.style.display = "";
            this.setAttribute("inner-value", input.value);
        });
    }
}

customElements.define("controllable-form", ControllableForm);
