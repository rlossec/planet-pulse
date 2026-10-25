import AppComponent from '../../base/AppComponent.js';
import indicatorMessages from '../../../i18n/en/indicators.js';
import { getIndicators } from '../../services/indicatorService.js';

export default class IndicatorList extends AppComponent {

    template() {
        return /*html*/`
        <section id="indicator-list" class="mt-4">
            <p id="list-error" class="alert alert-danger d-none" role="alert"></p>
            <div id="list-content" class="d-none">
                <h2 class="h5 text-center mb-3">${indicatorMessages.list.title}</h2>
                <div class="table-responsive">
                    <table class="table table-striped table-hover align-middle text-center">
                        <thead>
                            <tr>
                                <th scope="col">${indicatorMessages.list.columns.year}</th>
                                <th scope="col">${indicatorMessages.list.columns.co2}</th>
                                <th scope="col">${indicatorMessages.list.columns.renewableEnergy}</th>
                                <th scope="col">${indicatorMessages.list.columns.forest}</th>
                                <th scope="col">${indicatorMessages.list.columns.pm25}</th>
                            </tr>
                        </thead>
                        <tbody id="list-body"></tbody>
                    </table>
                </div>
            </div>
        </section>`;
    }

    afterRender() {
        getIndicators(this.props.isoCode2)
            .then((indicators) => this.#showIndicators(indicators))
            .catch((error) => this.#showError(error.message));
    }

    #showIndicators(indicators) {
        // No entry for this country: nothing is displayed
        if (indicators.length === 0) {
            return;
        }

        const body = this.querySelector('#list-body');
        indicators.forEach((indicator) => {
            const row = document.createElement('tr');
            [
                indicator.year,
                indicator.co2,
                indicator.renewableEnergy,
                indicator.forest,
                indicator.pm25
            ].forEach((value) => {
                const cell = document.createElement('td');
                cell.textContent = this.#formatValue(value);
                row.appendChild(cell);
            });
            body.appendChild(row);
        });

        this.querySelector('#list-content').classList.remove('d-none');
    }

    // A null indicator is displayed as an empty value, never as "null" or 0
    #formatValue(value) {
        if (value === null || value === undefined) {
            return indicatorMessages.list.emptyValue;
        }
        return value;
    }

    #showError(message) {
        const error = this.querySelector('#list-error');
        error.textContent = message;
        error.classList.remove('d-none');
    }
}

customElements.define('indicator-list', IndicatorList);