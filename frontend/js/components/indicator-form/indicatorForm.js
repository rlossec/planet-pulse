import AppComponent from '../../base/AppComponent.js';
import indicatorValidation from './IndicatorFormValidation.js';
import { getCurrentYear } from '../../utils/inputFormValidation.js';
import indicatorMessages from '../../../i18n/en/indicators.js';
import { createIndicator, updateIndicator } from '../../services/indicatorService.js';

export default class IndicatorForm extends AppComponent {

    template() {
        // Edit mode when the parent gives an existing entry, create mode otherwise
        const indicator = this.props.indicator;

        return /*html*/`
        <form id="indicator-form" class="card card-body mb-4" novalidate>
            ${indicator ? `<h2 class="h6 text-center mb-3">${indicatorMessages.form.editTitle} ${indicator.year}</h2>` : ''}
            <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-5 g-3">
                <div class="col">
                    <label for="year" class="form-label small indicator-field-label">${indicatorMessages.form.year.label}</label>
                    <input id="year" name="year" class="form-control" value="${indicator ? indicator.year : getCurrentYear()}" ${indicator ? 'readonly' : ''}>
                    <small class="form-text">${indicator ? indicatorMessages.form.year.readonlyDescription : indicatorMessages.form.year.description}</small>
                </div>
                <div class="col">
                    <label for="co2" class="form-label small indicator-field-label">${indicatorMessages.form.co2.label}</label>
                    <input id="co2" name="co2" class="form-control" placeholder="${indicatorMessages.form.co2.placeholder}"
                        value="${this.#fieldValue(indicator?.co2)}">
                    <small class="form-text">${indicatorMessages.form.co2.description}</small>
                </div>
                <div class="col">
                    <label for="renewable-energy" class="form-label small indicator-field-label">${indicatorMessages.form.renewableEnergy.label}</label>
                    <input id="renewable-energy" name="renewableEnergy" class="form-control" placeholder="${indicatorMessages.form.renewableEnergy.placeholder}"
                        step="any" value="${this.#fieldValue(indicator?.renewableEnergy)}">
                    <small class="form-text">${indicatorMessages.form.renewableEnergy.description}</small>
                </div>
                <div class="col">
                    <label for="forest" class="form-label small indicator-field-label">${indicatorMessages.form.forest.label}</label>
                    <input id="forest" name="forest" class="form-control" placeholder="${indicatorMessages.form.forest.placeholder}"
                        step="any" value="${this.#fieldValue(indicator?.forest)}">
                    <small class="form-text">${indicatorMessages.form.forest.description}</small>
                </div>
                <div class="col">
                    <label for="pm25" class="form-label small indicator-field-label">${indicatorMessages.form.pm25.label}</label>
                    <input id="pm25" name="pm25" class="form-control" placeholder="${indicatorMessages.form.pm25.placeholder}"
                        value="${this.#fieldValue(indicator?.pm25)}">
                    <small class="form-text">${indicatorMessages.form.pm25.description}</small>
                </div>
            </div>
            <!-- Validation Error Message if an error exist (d-none removed)-->
            <p id="validation-error" class="alert alert-danger mt-3 mb-0 d-none" role="alert"></p>
            <p id="success-message" class="alert alert-success mt-3 mb-0 d-none" role="status" aria-live="polite">
                ${indicatorMessages.form.success}
            </p>
            <div class="indicator-form-actions mt-4 pt-3 border-top d-flex justify-content-center gap-2">
                <button type="submit" class="btn btn-success px-4">${indicatorMessages.form.save}</button>
                <button id="cancel-form-btn" type="button" class="btn btn-outline-secondary px-4">${indicatorMessages.form.cancel}</button>
            </div>
        </form>`;
    }

    afterRender() {
        this.querySelector('#indicator-form')
            .addEventListener('submit', (event) => this.#handleSubmit(event));
        this.querySelector('#cancel-form-btn')
            .addEventListener('click', () => this.#handleCancel());
    }

    // A null value is displayed as an empty field
    #fieldValue(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return value;
    }

    #handleSubmit(event) {
        event.preventDefault();
        const submitter = event.submitter
        const data = Object.fromEntries(new FormData(event.target));

        const errorMessage = indicatorValidation(data)
        if (errorMessage) {
            this.#showError(errorMessage);
            return;
        }

        data.isoCode2 = this.props.isoCode2;

        this.#hideError();
        this.#hideSuccess();
        if (submitter) {
            submitter.disabled = true;
        }

        // Update the existing entry in edit mode, create a new one otherwise
        const isEditMode = Boolean(this.props.indicator);
        const request = isEditMode
            ? updateIndicator(this.props.indicator.id, data)
            : createIndicator(data);

        request
            .then(() => {
                if (isEditMode) {
                    // The page closes the form, shows the confirmation and reloads the list
                    this.dispatchEvent(new CustomEvent('indicator-update', { detail: data, bubbles: true }));
                } else {
                    this.#showSuccess();
                    this.dispatchEvent(new CustomEvent('indicator-submit', { detail: data, bubbles: true }));
                }
            })
            .catch((error) => {
                this.#showError(error.message);
            })
            .finally(() => {
                if (submitter) {
                    submitter.disabled = false;
                }
            });
    }

    #showError(message) {
        const validationError = this.querySelector('#validation-error');
        validationError.textContent = message;
        validationError.classList.remove('d-none');
    }

    #hideError() {
        const validationError = this.querySelector('#validation-error');
        validationError.textContent = null;
        validationError.classList.add('d-none');
    }

    #showSuccess() {
        this.querySelector('#success-message').classList.remove('d-none');
    }

    #hideSuccess() {
        this.querySelector('#success-message').classList.add('d-none');
    }

    #handleCancel() {
        this.dispatchEvent(new CustomEvent('indicator-cancel', { bubbles: true }));
    }
}

customElements.define('indicator-form', IndicatorForm);