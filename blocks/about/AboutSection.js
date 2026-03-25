export class AboutSection extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('about-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        } else {
            console.error('No se encontró el template: about-template en index.html');
        }
    }
}

customElements.define('about-section', AboutSection);