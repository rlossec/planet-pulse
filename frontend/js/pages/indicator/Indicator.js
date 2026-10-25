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
                    <p id="update-success" class="alert alert-success d-none" role="status" aria-live="polite">
                        ${indicatorMessages.updateSuccess}
                    </p>
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

        // Events coming from the form
        const formContainer = this.querySelector('#form-container');
        formContainer.addEventListener('indicator-cancel', () => this.#hideForm());
        // The entry is saved by the form: reload the list to display it
        formContainer.addEventListener('indicator-submit', () => this.#showList());
        // The entry is updated by the form: close it, confirm, and reload the list
        formContainer.addEventListener('indicator-update', () => this.#handleUpdated());

        // Event coming from the list: the user wants to edit one of its entries
        this.querySelector('#list-container')
            .addEventListener('indicator-edit', (event) => this.#showForm(event.detail));

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

    // Without argument: form to create an entry. With an entry: form to edit it
    #showForm(indicator = null) {
        const container = this.querySelector('#form-container');
        this.#hideUpdateSuccess();
        container.replaceChildren();
        this.attachChild(container, 'indicator-form', { isoCode2: this.state.isoCode2, indicator });

        const button = this.querySelector('#toggle-form-btn');
        button.hidden = true;
        button.setAttribute('aria-expanded', 'true');

        // The form is above the list: bring it into view when opened from a row
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    #hideForm() {
        this.querySelector('#form-container').replaceChildren();
        const button = this.querySelector('#toggle-form-btn');
        button.hidden = false;
        button.setAttribute('aria-expanded', 'false');
    }

    #handleUpdated() {
        this.#hideForm();
        this.#showList();
        this.#showUpdateSuccess();
    }

    #showUpdateSuccess() {
        this.querySelector('#update-success').classList.remove('d-none');
        setTimeout(() => this.#hideUpdateSuccess(), 4000);
    }

    #hideUpdateSuccess() {
        this.querySelector('#update-success').classList.add('d-none');
    }
}

customElements.define('app-indicator', Indicator);