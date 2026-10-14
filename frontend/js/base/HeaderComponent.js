import AppComponent from "./AppComponent.js";
import BrandComponent from "./BrandComponent.js";

export default class HeaderComponent extends AppComponent {
  template() {
    return `
      <header class="border-bottom bg-white">
        <nav class="navbar navbar-expand-sm container py-3 position-relative">

          <div class="position-absolute start-50 translate-middle-x d-sm-none">
            <brand-component></brand-component>
          </div>

          <div class="d-none d-sm-block me-sm-5">
            <brand-component></brand-component>
          </div>

          <button
            class="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#planetPulseNav"
            aria-controls="planetPulseNav"
            aria-expanded="false"
            aria-label="Ouvrir la navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="planetPulseNav">
            <div class="navbar-nav ms-sm-auto gap-lg-2">
              <a class="nav-link" href="/countries/">Countries</a>
              <a class="nav-link" href="/indicators/">Indicators</a>
              <a class="nav-link" href="/import-data/">Import data</a>
            </div>
          </div>

        </nav>
      </header>
    `;
    }
    
  afterRender() {
    this.#highlightCurrentLink();
  }

  #highlightCurrentLink() {
    this.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

}

customElements.define("header-component", HeaderComponent);