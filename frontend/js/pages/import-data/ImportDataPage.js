import PageComponent from "../../base/PageComponent.js";

class ImportDataPage extends PageComponent {
  content() {
    return `
            <h1>Import Data</h1>
            <button>Import</button>
        `;
  }
}

customElements.define("import-data-page", ImportDataPage);
