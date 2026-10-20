import AppComponent from '../../components/AppComponent.js';
import '../../components/indicator-form/IndicatorForm.js';

export default class Indicator extends AppComponent {

    beforeRender() {
        const params = new URLSearchParams(window.location.search);
        this.state = { isoCode2: params.get('iso_code_2') };
        console.log('Indicator state:', this.state); // temporary: for debugging
    }

    template() {
        return document.getElementById('indicator-template').innerHTML;
    }

    afterRender() {
        const { isoCode2 } = this.state;
        if (!isoCode2) {
            this.querySelector('#error').classList.remove('d-none');
            this.querySelector('#content').classList.add('d-none');
            return;
        }
        this.querySelector('#country-code').textContent = isoCode2.toUpperCase();

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
        this.attachChild(this.querySelector('#form-container'),
        'indicator-form',
        {isoCode2: this.state.isoCode2});
        const button = this.querySelector('#toggle-form-btn');
        button.hidden = true;
        button.setAttribute('aria-expanded', 'true');
    }

    #hideForm() {
        this.querySelector('#form-container').replaceChildren();
        const button = this.querySelector('#toggle-form-btn');
        button.hidden = false;
        button.setAttribute('aria-expanded', 'false');
    }
}

customElements.define('app-indicator', Indicator);