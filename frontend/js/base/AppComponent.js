// Simple base component to be extended by every "page" or "component"
// Idea: could be improved and/or extended to provide
// additional behaviour (form handling, validation handling...)
export default class AppComponent extends HTMLElement {
  // state: the state (data) of the component
  #state = {}; // Default state (empty object)

  // props: data for parent/child components
  #props = {}; // Default props (empty object)

  /* Functions NOT to override, defines the lifecycle of a component */

  connectedCallback() {
    // template method!
    this.beforeRender();
    this.#render();
    this.afterRender();
  }

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = state;
  }

  get props() {
    return this.#props;
  }

  // Appends child component to given parent container
  attachChild(parent, childTagName, data) {
    const child = document.createElement(childTagName);
    child.#props = data;
    parent.appendChild(child);
  }

  // Appends mulitple child components to given parent container
  attachChildren(parent, childTagName, dataset = []) {
    dataset.forEach((data) => {
      this.attachChild(parent, childTagName, data);
    });
  }

  // "Step" 1 hook
  beforeRender() {
    // Usually fetch some data
    return; // Default does nothing
  }

  // Step 2
  #render() {
    // Updates the DOM
    // innerHTML may have security issues (XSS)
    this.innerHTML = this.template();
  }

  template() {
    // a component must define a HTML template
    throw new Error("No HTML template defined");
  }

  // Step 3 hook
  afterRender() {
    // Usually parent-child communication, event listeners registration
    return; // Default does nothing
  }
}
