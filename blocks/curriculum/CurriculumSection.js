export class CurriculumSection extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('curriculum-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        } else {
            console.error('No se encontró el template: curriculum-template en index.html');
        }
    }
}

customElements.define('curriculum-section', CurriculumSection);