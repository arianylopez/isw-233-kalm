export class FooterSection extends HTMLElement {
    constructor() {
        super(); 
        const template = document.getElementById('footer-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        } else {
            console.error('No se encontró el template: footer-template en index.html');
        }
    }
}

customElements.define('footer-section', FooterSection);