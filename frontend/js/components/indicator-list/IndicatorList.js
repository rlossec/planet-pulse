import AppComponent from '../../base/AppComponent.js';
import indicatorMessages from '../../../i18n/en/indicators.js';
import { getIndicators, deleteIndicator } from '../../services/indicatorService.js';

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
                                <th scope="col"><span class="visually-hidden">${indicatorMessages.list.columns.actions}</span></th>
                            </tr>
                        </thead>
                        <tbody id="list-body"></tbody>
                    </table>
                </div>
            </div>
        </section>`;
    }

    afterRender() {
        this.#loadIndicators();
    }

    #loadIndicators() {
        getIndicators(this.props.isoCode2)
            .then((indicators) => this.#showIndicators(indicators))
            .catch((error) => this.#showError(error.message));
    }

    #showIndicators(indicators) {
        const body = this.querySelector('#list-body');
        const content = this.querySelector('#list-content');

        body.replaceChildren();

        // No entry for this country (or the last one was deleted): nothing is displayed
        if (indicators.length === 0) {
            content.classList.add('d-none');
            return;
        }

        indicators.forEach((indicator) => {
            body.appendChild(this.#createRow(indicator));
        });

        content.classList.remove('d-none');
    }

    #createRow(indicator) {
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

        const actionCell = document.createElement('td');
        actionCell.appendChild(this.#createDeleteButton(indicator));
        row.appendChild(actionCell);

        return row;
    }

            #createDeleteButton(indicator) {
        const label = `${indicatorMessages.list.deleteLabel} ${indicator.year}`;

        const button = document.createElement('button');
        button.type = 'button';
        // Plain red cross made of a text character: no icon font needed
        button.className = 'border-0 bg-transparent text-danger p-0 lh-1 fs-4 fw-bold';
        button.title = label;
        // The cross is decorative: the text for screen readers is in the visually-hidden span
        button.innerHTML = '<span aria-hidden="true">&times;</span><span class="visually-hidden"></span>';
        button.querySelector('.visually-hidden').textContent = label;

        button.addEventListener('click', () => this.#handleDelete(indicator, button));

        return button;
    }

    #handleDelete(indicator, button) {
        if (!window.confirm(indicatorMessages.list.deleteConfirm)) {
            return;
        }

        this.#hideError();
        button.disabled = true;

        // On success, the list is reloaded: the row disappears (and the table too if it was the last one)
        deleteIndicator(indicator.id)
            .then(() => this.#loadIndicators())
            .catch((error) => {
                this.#showError(error.message);
                button.disabled = false;
            });
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

    #hideError() {
        const error = this.querySelector('#list-error');
        error.textContent = null;
        error.classList.add('d-none');
    }
}

customElements.define('indicator-list', IndicatorList);