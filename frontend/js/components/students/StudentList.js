import AppComponent from "../../base/AppComponent.js";
import "./StudentItem.js"; // Import side-effects only ("student-item" web component)

class StudentList extends AppComponent {
  beforeRender() {
    this.state = {
      students: ["Alice", "Bob", "Charly", "Dan", "Emily", "Frank"],
    };
  }

  template() {
    return /*html*/ `
            <h2>Student list</h2>
            <!-- Container for child components: -->
            <ol id="list"></ol>
        `;
  }

  afterRender() {
    this.#handleStudents();
  }

  #handleStudents() {
    const parent = this.querySelector("#list");
    this.attachChildren(parent, "student-item", this.state.students);
  }
}

customElements.define("student-list", StudentList);
