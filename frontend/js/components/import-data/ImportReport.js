import AppComponent from '../../base/AppComponent.js';

// Frame shown after a successful import: title plus the six counts of ImportReportDto.
class ImportReport extends AppComponent {

    beforeRender() {
        this.state = {
            report: this.props?.fetched !== undefined ? this.props : null
        };
    }

    template() {
        const report = this.state.report;
        if (!report) {
            return /*html*/`<article class="card"><div class="card-body text-muted">No report</div></article>`;
        }

        return /*html*/`
            <article class="card">
                <div class="card-body">
                    <h2 class="h5 card-title mb-3">Import finished</h2>
                    <dl class="row mb-0">
                        ${this.#line('Fetched', report.fetched)}
                        ${this.#line('Rejected', report.rejected)}
                        ${this.#line('Already known', report.skippedExisting)}
                        ${this.#line('Imported', report.imported)}
                        ${this.#line('Regions created', report.regionsCreated)}
                        ${this.#line('Subregions created', report.subregionsCreated)}
                    </dl>
                </div>
            </article>
        `;
    }

    #line(label, value) {
        return /*html*/`
            <dt class="col-8 fw-normal">${label}</dt>
            <dd class="col-4 text-end mb-1">${this.#formatNumber(value)}</dd>
        `;
    }

    #formatNumber(value) {
        if (value === null || value === undefined) {
            return '—';
        }
        return Number(value).toLocaleString('en');
    }
}

customElements.define('import-report', ImportReport);
