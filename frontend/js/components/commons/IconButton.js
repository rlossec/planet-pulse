import AppComponent from "../../base/AppComponent.js";

// Button with a Bootstrap Icon before its visible label.
class IconButton extends AppComponent {
  beforeRender() {
    this.state = {
      label: this.props?.label ?? "",
      icon: this.props?.icon ?? null,
      disabled: Boolean(this.props?.disabled),
    };
  }

  template() {
    const { label, icon, disabled } = this.state;
    const iconTag = icon
      ? `<i class="bi bi-${icon}" aria-hidden="true"></i>`
      : "";

    return /*html*/ `
            <button type="button" class="btn btn-outline-dark btn-lg d-inline-flex align-items-center gap-3 px-4 py-3"
                ${disabled ? 'disabled aria-busy="true"' : ""}>
                ${iconTag}
                <span>${label}</span>
            </button>
        `;
  }

  // Updates the rendered button in place, so it keeps keyboard focus.
  setDisabled(disabled) {
    this.state = { ...this.state, disabled };
    const button = this.querySelector("button");
    button.disabled = disabled;
    button.toggleAttribute("aria-busy", disabled);
  }
}

customElements.define("icon-button", IconButton);
