import AppComponent from '../AppComponent.js';

// Template: loaded once, before the class is defined
const html = await (await fetch(new URL('./IndicatorForm.html', import.meta.url))).text();

// Stylesheet: added once to the document, next to the component's own files
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = new URL('./IndicatorForm.css', import.meta.url).href;
document.head.appendChild(stylesheet);

export default class IndicatorForm extends AppComponent {

    template() {
        return html;
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
        this.dispatchEvent(new CustomEvent('indicator-submit', { detail: data, bubbles: true }));
        console.log(data);
    }

    #handleCancel() {
        this.dispatchEvent(new CustomEvent('indicator-cancel', { bubbles: true }));
    }
}

customElements.define('indicator-form', IndicatorForm);