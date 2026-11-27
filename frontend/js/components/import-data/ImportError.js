import AppComponent from '../../base/AppComponent.js';

// Frame shown when the import fails: title plus the message to display.
class ImportError extends AppComponent {

    beforeRender() {
        this.state = {
            message: this.props?.message ?? 'The import could not be completed. Try again.'
        };
    }

    template() {
        return /*html*/`
            <article class="card border-danger" role="alert">
                <div class="card-body">
                    <h2 class="h5 card-title text-danger mb-3">Import failed</h2>
                    <p class="card-text mb-0">${this.state.message}</p>
                </div>
            </article>
        `;
    }
}

customElements.define('import-error', ImportError);
