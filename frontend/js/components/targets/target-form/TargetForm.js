import AppComponent from '../../../base/AppComponent.js';
import targetValidation from './TargetFormValidation.js';
import { getCurrentYear } from '../../../utils/inputFormValidation.js';
import targetMessages from '../../../../i18n/en/targets.js';
import { createTarget, updateTarget } from '../../../services/targetService.js';

export default class TargetForm extends AppComponent {

    template() {
        const target = this.props.target;

        return /*html*/`
        <form id="target-form" class="card card-body mb-4" novalidate>
            ${target ? `<h2 class="h6 text-center mb-3">${targetMessages.form.editTitle} ${target.year}</h2>` : ''}
            <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-5 g-3">
                <div class="col">
                    <label for="year" class="form-label small indicator-field-label">${targetMessages.form.year.label}</label>
                    <input id="year" name="year" class="form-control" value="${target ? target.year : getCurrentYear() + 1}" ${target ? 'readonly' : ''}>
                    <small class="form-text">${target ? targetMessages.form.year.readonlyDescription : targetMessages.form.year.description}</small>
                </div>
                <div class="col">
                    <label for="co2" class="form-label small indicator-field-label">${targetMessages.form.co2.label}</label>
                    <input id="co2" name="co2" class="form-control" placeholder="${targetMessages.form.co2.placeholder}"
                        value="${this.#fieldValue(target?.co2)}">
                    <small class="form-text">${targetMessages.form.co2.description}</small>
                </div>
                <div class="col">
                    <label for="renewable-energy" class="form-label small indicator-field-label">${targetMessages.form.renewableEnergy.label}</label>
                    <input id="renewable-energy" name="renewableEnergy" class="form-control" placeholder="${targetMessages.form.renewableEnergy.placeholder}"
                        step="any" value="${this.#fieldValue(target?.renewableEnergy)}">
                    <small class="form-text">${targetMessages.form.renewableEnergy.description}</small>
                </div>
                <div class="col">
                    <label for="forest" class="form-label small indicator-field-label">${targetMessages.form.forest.label}</label>
                    <input id="forest" name="forest" class="form-control" placeholder="${targetMessages.form.forest.placeholder}"
                        step="any" value="${this.#fieldValue(target?.forest)}">
                    <small class="form-text">${targetMessages.form.forest.description}</small>
                </div>
                <div class="col">
                    <label for="pm25" class="form-label small indicator-field-label">${targetMessages.form.pm25.label}</label>
                    <input id="pm25" name="pm25" class="form-control" placeholder="${targetMessages.form.pm25.placeholder}"
                        value="${this.#fieldValue(target?.pm25)}">
                    <small class="form-text">${targetMessages.form.pm25.description}</small>
                </div>
            </div>
            <p id="validation-error" class="alert alert-danger mt-3 mb-0 d-none" role="alert"></p>
            <div class="indicator-form-actions mt-4 pt-3 border-top d-flex justify-content-center gap-2">
                <button type="submit" class="btn btn-success px-4">${targetMessages.form.save}</button>
                <button id="cancel-form-btn" type="button" class="btn btn-outline-secondary px-4">${targetMessages.form.cancel}</button>
            </div>
        </form>`;
    }

    afterRender() {
        this.querySelector('#target-form')
            .addEventListener('submit', (event) => this.#handleSubmit(event));
        this.querySelector('#cancel-form-btn')
            .addEventListener('click', () => this.#handleCancel());
    }

    #fieldValue(value) {
        if (value === null || value === undefined) {
            return '';
        }
        return value;
    }

    #handleSubmit(event) {
        event.preventDefault();
        const submitter = event.submitter;
        const data = Object.fromEntries(new FormData(event.target));

        const errorMessage = targetValidation(data);
        if (errorMessage) {
            this.#showError(errorMessage);
            return;
        }

        data.isoCode2 = this.props.isoCode2;
        this.#hideError();
        if (submitter) {
            submitter.disabled = true;
        }

        const isEditMode = Boolean(this.props.target);
        const request = isEditMode
            ? updateTarget(this.props.target.id, data)
            : createTarget(data);

        request
            .then(() => {
                const eventName = isEditMode ? 'target-update' : 'target-submit';
                this.dispatchEvent(new CustomEvent(eventName, { detail: data, bubbles: true }));
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

    #handleCancel() {
        this.dispatchEvent(new CustomEvent('target-cancel', { bubbles: true }));
    }
}

customElements.define('target-form', TargetForm);
