import PageComponent from "../../base/PageComponent.js";
import "../../components/commons/IconButton.js";
import "../../components/import-data/ImportReport.js";
import "../../components/import-data/ImportError.js";
import { importCountries } from "../../services/importService.js";

class ImportDataPage extends PageComponent {
  #button;

  // Default state
  beforeRender() {
    this.state = {
      status: "idle",
      report: null,
      errorMessage: null,
    };
  }

  content() {
    return /*html*/ `
            <h1 class="visually-hidden">Import data</h1>
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 d-flex flex-column gap-4">
                    <div id="action" class="d-flex justify-content-center"></div>
                    <div id="result" aria-live="polite"></div>
                </div>
            </div>
        `;
  }

  afterRender() {
    const action = this.querySelector("#action");
    this.attachChild(action, "icon-button", {
      label: "Import",
      icon: "download",
    });
    this.#button = action.querySelector("icon-button");
    this.#button.addEventListener("click", () => this.#import());
  }

  async #import() {
    this.state = { status: "loading", report: null, errorMessage: null };
    this.#button.setDisabled(true);

    try {
      const report = await importCountries();
      this.state = { status: "success", report, errorMessage: null };
    } catch (error) {
      this.state = { status: "error", report: null, errorMessage: error.message };
    } finally {
      this.#button.setDisabled(false);
    }

    this.#showResult();
  }

  #showResult() {
    const result = this.querySelector("#result");
    result.innerHTML = "";

    const { status, report, errorMessage } = this.state;
    if (status === "success") {
      this.attachChild(result, "import-report", report);
    } else if (status === "error") {
      this.attachChild(result, "import-error", { message: errorMessage });
    }
  }
}

customElements.define("import-data-page", ImportDataPage);
