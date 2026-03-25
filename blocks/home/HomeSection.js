export class HomeSection extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('home-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        } else {
            console.error('No se encontró el template');
        }
    }
}

customElements.define('home-section', HomeSection);