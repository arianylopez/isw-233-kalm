export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
    }

    get templateId() { return ''; } 

    connectedCallback() {
        if (this.shadowRoot.childNodes.length > 0) return;
        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(styleNode => {
            this.shadowRoot.appendChild(styleNode.cloneNode(true));
        });

        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        this.shadowRoot.appendChild(faLink);

        const template = document.getElementById(this.templateId) as HTMLTemplateElement;
        
        if (template) {
            this.shadowRoot!.appendChild(template.content.cloneNode(true)); // Usamos "!" para decirle que shadowRoot no es null
        }
    }
}