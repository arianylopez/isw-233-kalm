export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
    }

    get templateId(): string { return ''; } 

    connectedCallback(): void {
        if (this.shadowRoot!.childNodes.length > 0) return;

        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(styleNode => {
            this.shadowRoot!.appendChild(styleNode.cloneNode(true));
        });

        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        this.shadowRoot!.appendChild(faLink);

        const template = document.getElementById(this.templateId) as HTMLTemplateElement | null;
        
        if (template) {
            this.shadowRoot!.appendChild(template.content.cloneNode(true));
        } else {
            console.error(`Template no encontrado: ${this.templateId}`);
        }
    }
}