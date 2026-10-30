import AppComponent from "../../base/AppComponent.js";

class StudentItem extends AppComponent {
  static counter = 0;

  beforeRender() {
    this.state = {
      id: ++StudentItem.counter,
      uuid: crypto.randomUUID(),
    };
  }

  template() {
    return /*html*/ `
            <li>
                ${this.props}: ${this.state.uuid} (<span style="color: red">${this.state.id}</span>)
            </li>
        `;
  }
}

customElements.define("student-item", StudentItem);
