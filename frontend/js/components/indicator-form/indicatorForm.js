import AppComponent from '../../base/AppComponent.js';
import indicatorValidation from './IndicatorFormValidation.js';
import { getCurrentYear } from '../../utils/inputFormValidation.js';
import indicatorMessages from '../../../i18n/en/indicators.js';

export default class IndicatorForm extends AppComponent {

    template() {
        return /*html*/`
        <form id="indicator-form" class="card card-body mb-4" novalidate>
            <div class="row row-cols-1 row-cols-sm-5 g-3">
                <div class="col">
                    <label for="year" class="form-label small indicator-field-label">${indicatorMessages.form.year.label}</label>
                    <input id="year" name="year" class="form-control" value="${getCurrentYear()}">
                    <small class="form-text">${indicatorMessages.form.year.description}</small>
                </div>
                <div class="col">
                    <label for="co2" class="form-label small indicator-field-label">${indicatorMessages.form.co2.label}</label>
                    <input id="co2" name="co2" class="form-control" placeholder="${indicatorMessages.form.co2.placeholder}">
                    <small class="form-text">${indicatorMessages.form.co2.description}</small>
                </div>
                <div class="col">
                    <label for="renewable-energy" class="form-label small indicator-field-label">${indicatorMessages.form.renewableEnergy.label}</label>
                    <input id="renewable-energy" name="renewableEnergy" class="form-control" placeholder="${indicatorMessages.form.renewableEnergy.placeholder}"
                        step="any">
                    <small class="form-text">${indicatorMessages.form.renewableEnergy.description}</small>
                </div>
                <div class="col">
                    <label for="forest" class="form-label small indicator-field-label">${indicatorMessages.form.forest.label}</label>
                    <input id="forest" name="forest" class="form-control" placeholder="${indicatorMessages.form.forest.placeholder}"
                        step="any">
                    <small class="form-text">${indicatorMessages.form.forest.description}</small>
                </div>
                <div class="col">
                    <label for="pm25" class="form-label small indicator-field-label">${indicatorMessages.form.pm25.label}</label>
                    <input id="pm25" name="pm25" class="form-control" placeholder="${indicatorMessages.form.pm25.placeholder}">
                    <small class="form-text">${indicatorMessages.form.pm25.description}</small>
                </div>
            </div>
            <!-- Validation Error Message if an error exist (d-none removed)-->
            <p id="validation-error" class="alert alert-danger mt-3 mb-0 d-none" role="alert"></p>
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

    #handleSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target));
        const validationError = this.querySelector('#validation-error');
        const errorMessage = indicatorValidation(data)
        if (errorMessage) {
            validationError.textContent = errorMessage;
            validationError.classList.remove('d-none');
            return;
        }

        data.isoCode2 = this.props.isoCode2; // add the country code to the data object

        validationError.classList.add('d-none');
        validationError.textContent = null;
        this.dispatchEvent(new CustomEvent('indicator-submit', { detail: data, bubbles: true }));
        console.log(data);
    }

    #handleCancel() {
        this.dispatchEvent(new CustomEvent('indicator-cancel', { bubbles: true }));
    }
}

customElements.define('indicator-form', IndicatorForm);