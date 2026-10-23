import PageComponent from "../../base/PageComponent.js";
import "../../components/students/StudentList.js"; // Import side-effects only ("student-list" web component)

class StudentsPage extends PageComponent {
  content() {
    return /*html*/ `
            <h1>Simplon</h1>
            <p>Our students are the best in the world!</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Impedit asperiores laudantium facilis in natus laborum? 
                Quasi quis quaerat veritatis, autem possimus corporis sapiente culpa. 
                Asperiores incidunt possimus quam nam enim.
            </p>
            <student-list></student-list>
            <student-list></student-list>
        `;
  }
}

customElements.define("students-page", StudentsPage);
