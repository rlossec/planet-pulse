import AppComponent from '../../components/AppComponent.js';
import '../../components/indicator-form/IndicatorForm.js'; // registers <indicator-form>

export default class Indicator extends AppComponent {

    beforeRender() {
        const params = new URLSearchParams(window.location.search);
        this.state = { codeIso2: params.get('code_iso2') };
        console.log('Indicator state:', this.state); // temporary: for debugging
    }

    template() {
        return document.getElementById('indicator-template').innerHTML;
    }

    afterRender() {
        const { codeIso2 } = this.state;
        if (!codeIso2) {
            this.querySelector('#error').classList.remove('d-none');
            this.querySelector('#content').classList.add('d-none');
            return;
        }
        this.querySelector('#country-code').textContent = codeIso2.toUpperCase();

        this.querySelector('#toggle-form-btn')
            .addEventListener('click', () => this.#toggleForm());

        // Events coming from the child component
        const container = this.querySelector('#form-container');
        container.addEventListener('indicator-cancel', () => this.#hideForm());
        container.addEventListener('indicator-submit', (event) => {
            console.log(event.detail); // temporary: the API call is for the next feature
        });
    }

    #toggleForm() {
        if (this.querySelector('#form-container').hasChildNodes()) {
            this.#hideForm();
        } else {
            this.#showForm();
        }
    }

    #showForm() {
        this.attachChild(this.querySelector('#form-container'), 'indicator-form', {});
        this.querySelector('#toggle-form-btn').setAttribute('aria-expanded', 'true');
    }

    #hideForm() {
        this.querySelector('#form-container').replaceChildren();
        this.querySelector('#toggle-form-btn').setAttribute('aria-expanded', 'false');
    }
}

customElements.define('app-indicator', Indicator);