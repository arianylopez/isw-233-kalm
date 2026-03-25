export class ContactSection extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('contact-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        } else {
            console.error('No se encontró el template: contact-template en index.html');
        }
    }
}

customElements.define('contact-section', ContactSection);