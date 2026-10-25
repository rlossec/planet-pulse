import PageComponent from '../../base/PageComponent.js';
import '../../components/indicator-form/IndicatorForm.js';
import '../../components/indicator-list/IndicatorList.js';
import indicatorMessages from '../../../i18n/en/indicators.js';

export default class Indicator extends PageComponent {

    beforeRender() {
        document.title = indicatorMessages.title;
        const params = new URLSearchParams(window.location.search);
        this.state = { isoCode2: params.get('iso_code_2') };
    }

    content() {
        return /*html*/`
            <main class="container py-4">
                <div id="error" class="alert alert-danger d-none">
                    ${indicatorMessages.missingCountryCode}
                </div>

                <div id="content">
                    <div class="mb-4">
                        <h1 class="h3 text-center text-uppercase mb-1">${indicatorMessages.title}</h1>
                        <p class="text-center mb-3">${indicatorMessages.countryLabel} <span id="country-code"></span></p>
                        <div id="list-container"></div>
                        <div class="row justify-content-center">
                            <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                                <button id="toggle-form-btn" type="button" class="btn btn-primary w-100"
                                        aria-expanded="false" aria-controls="form-container">
                                    <i class="bi bi-plus-lg"></i> ${indicatorMessages.addData}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="form-container"></div>
                </div>
            </main>`;
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
        // The entry is saved by the form: reload the list to display it
        container.addEventListener('indicator-submit', () => this.#showList());

        this.#showList();
    }

    // Replaces the list by a new one, which fetches the entries again
    #showList() {
        const container = this.querySelector('#list-container');
        container.replaceChildren();
        this.attachChild(container, 'indicator-list', { isoCode2: this.state.isoCode2 });
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