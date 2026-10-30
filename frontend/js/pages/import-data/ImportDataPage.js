import PageComponent from "../../base/PageComponent.js";

class ImportDataPage extends PageComponent {
  content() {
    return /*html*/`
            <h1>Import Data</h1>
            <button>Import</button>
        `;
  }
}

customElements.define("import-data-page", ImportDataPage);
