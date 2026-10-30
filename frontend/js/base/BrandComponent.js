
import AppComponent from "./AppComponent.js";

export default class BrandComponent extends AppComponent {
  template() {
    return /*html*/`
      <a class="navbar-brand fw-bold fs-4 m-0" href="/">
        <img src="../../../assets/img/planet-pulse-logo.png" width="30" height="30" class="d-inline-block align-top" alt="PlanetPulse Logo" />
        <span>PlanetPulse</span>
      </a>
    `;
  }
}

customElements.define("brand-component", BrandComponent);
