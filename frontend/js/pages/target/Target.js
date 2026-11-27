import PageComponent from '../../base/PageComponent.js';
import '../../components/targets/target-form/TargetForm.js';
import '../../components/targets/target-list/TargetList.js';
import targetMessages from '../../../i18n/en/targets.js';

export default class Target extends PageComponent {
    #successTimeout = null;

    beforeRender() {
        document.title = targetMessages.title;
        const params = new URLSearchParams(window.location.search);
        this.state = { isoCode2: params.get('iso_code_2') };
    }

    content() {
        return /*html*/`
            <div id="error" class="alert alert-danger d-none">
                ${targetMessages.missingCountryCode}
            </div>
            <div id="content">
                <div class="mb-4">
                    <h1 class="h3 text-center text-uppercase mb-1">${targetMessages.title}</h1>
                    <p class="text-center mb-3">${targetMessages.countryLabel} <span id="country-code"></span></p>
                    <div id="list-container"></div>
                    <div class="row justify-content-center">
                        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                            <button id="toggle-form-btn" type="button" class="btn btn-primary w-100"
                                    aria-expanded="false" aria-controls="form-container">
                                ${targetMessages.addData}
                            </button>
                        </div>
                    </div>
                </div>
                <p id="operation-success" class="alert alert-success d-none" role="status" aria-live="polite"></p>
                <div id="form-container"></div>
            </div>`;
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

        const formContainer = this.querySelector('#form-container');
        formContainer.addEventListener('target-cancel', () => this.#hideForm());
        formContainer.addEventListener('target-submit', () => this.#handleCreated());
        formContainer.addEventListener('target-update', () => this.#handleUpdated());
        this.querySelector('#list-container')
            .addEventListener('target-edit', (event) => this.#showForm(event.detail));

        this.#showList();
    }

    #showList() {
        const container = this.querySelector('#list-container');
        container.replaceChildren();
        this.attachChild(container, 'target-list', { isoCode2: this.state.isoCode2 });
    }

    #toggleForm() {
        if (this.querySelector('#form-container').hasChildNodes()) {
            this.#hideForm();
        } else {
            this.#showForm();
        }
    }

    #showForm(target = null) {
        const container = this.querySelector('#form-container');
        this.#hideSuccess();
        container.replaceChildren();
        this.attachChild(container, 'target-form', { isoCode2: this.state.isoCode2, target });

        const button = this.querySelector('#toggle-form-btn');
        button.hidden = true;
        button.setAttribute('aria-expanded', 'true');
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    #hideForm() {
        this.querySelector('#form-container').replaceChildren();
        const button = this.querySelector('#toggle-form-btn');
        button.hidden = false;
        button.setAttribute('aria-expanded', 'false');
    }

    #handleCreated() {
        this.#handleSaved(targetMessages.form.success);
    }

    #handleUpdated() {
        this.#handleSaved(targetMessages.updateSuccess);
    }

    #handleSaved(message) {
        this.#hideForm();
        this.#showList();
        this.#showSuccess(message);
    }

    #showSuccess(message) {
        const success = this.querySelector('#operation-success');
        success.textContent = message;
        success.classList.remove('d-none');
        clearTimeout(this.#successTimeout);
        this.#successTimeout = setTimeout(() => this.#hideSuccess(), 4000);
    }

    #hideSuccess() {
        clearTimeout(this.#successTimeout);
        this.#successTimeout = null;
        this.querySelector('#operation-success').classList.add('d-none');
    }
}

customElements.define('app-target', Target);
