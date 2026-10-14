import AppComponent from "./AppComponent.js";
import HeaderComponent from "./HeaderComponent.js";

// Base component for every page: provides the shared layout (header, nav, main)
// Pages must define their specific content in content()
export default class PageComponent extends AppComponent {
  template() {
    return `
      <header-component></header-component>

      <main class="container px-3 px-sm-3 py-4 py-lg-5">
        ${this.content()}
      </main>
    `;
  }

  content() {
    throw new Error("No page content defined");
  }
}