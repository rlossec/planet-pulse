import AppComponent from '../../../base/AppComponent.js';
import targetMessages from '../../../../i18n/en/targets.js';
import { getTargets, deleteTarget } from '../../../services/targetService.js';

export default class TargetList extends AppComponent {

    template() {
        return /*html*/`
        <section id="target-list" class="mt-4">
            <p id="list-error" class="alert alert-danger d-none" role="alert"></p>
            <div id="list-content" class="d-none">
                <h2 class="h5 text-center mb-3">${targetMessages.list.title}</h2>
                <div class="table-responsive">
                    <table class="table table-striped table-hover align-middle text-center">
                        <thead>
                            <tr>
                                <th scope="col">${targetMessages.list.columns.year}</th>
                                <th scope="col">${targetMessages.list.columns.co2}</th>
                                <th scope="col">${targetMessages.list.columns.renewableEnergy}</th>
                                <th scope="col">${targetMessages.list.columns.forest}</th>
                                <th scope="col">${targetMessages.list.columns.pm25}</th>
                                <th scope="col"><span class="visually-hidden">${targetMessages.list.columns.actions}</span></th>
                            </tr>
                        </thead>
                        <tbody id="list-body"></tbody>
                    </table>
                </div>
            </div>
        </section>`;
    }

    afterRender() {
        this.#loadTargets();
    }

    #loadTargets() {
        getTargets(this.props.isoCode2)
            .then((targets) => this.#showTargets(targets))
            .catch((error) => this.#showError(error.message));
    }

    #showTargets(targets) {
        const body = this.querySelector('#list-body');
        const content = this.querySelector('#list-content');
        body.replaceChildren();

        if (targets.length === 0) {
            content.classList.add('d-none');
            return;
        }

        targets.forEach((target) => body.appendChild(this.#createRow(target)));
        content.classList.remove('d-none');
    }

    #createRow(target) {
        const row = document.createElement('tr');

        [target.year, target.co2, target.renewableEnergy, target.forest, target.pm25]
            .forEach((value) => {
                const cell = document.createElement('td');
                cell.textContent = this.#formatValue(value);
                row.appendChild(cell);
            });

        const actionCell = document.createElement('td');
        actionCell.appendChild(this.#createEditButton(target));
        actionCell.appendChild(this.#createDeleteButton(target));
        row.appendChild(actionCell);
        return row;
    }

    #createEditButton(target) {
        const label = `${targetMessages.list.editLabel} ${target.year}`;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'border-0 bg-transparent text-primary p-0 lh-1 fs-5 me-3';
        button.title = label;
        button.innerHTML = '<span aria-hidden="true">&#9998;</span><span class="visually-hidden"></span>';
        button.querySelector('.visually-hidden').textContent = label;
        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('target-edit', { detail: target, bubbles: true }));
        });
        return button;
    }

    #createDeleteButton(target) {
        const label = `${targetMessages.list.deleteLabel} ${target.year}`;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'border-0 bg-transparent text-danger p-0 lh-1 fs-4 fw-bold';
        button.title = label;
        button.innerHTML = '<span aria-hidden="true">&times;</span><span class="visually-hidden"></span>';
        button.querySelector('.visually-hidden').textContent = label;
        button.addEventListener('click', () => this.#handleDelete(target, button));
        return button;
    }

    #handleDelete(target, button) {
        if (!window.confirm(targetMessages.list.deleteConfirm)) {
            return;
        }

        this.#hideError();
        button.disabled = true;
        deleteTarget(target.id)
            .then(() => this.#loadTargets())
            .catch((error) => {
                this.#showError(error.message);
                button.disabled = false;
            });
    }

    #formatValue(value) {
        return value === null || value === undefined ? targetMessages.list.emptyValue : value;
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

customElements.define('target-list', TargetList);
