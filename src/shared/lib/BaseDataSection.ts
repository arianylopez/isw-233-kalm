import { API } from '../api/API';

export class BaseDataSection extends HTMLElement {
    data: any; 

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null; 
    }

    get templateId(): string { return ''; } 

    async connectedCallback(): Promise<void> {
        if (this.shadowRoot!.childNodes.length === 0) {
            
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
            }
        }

        await this.loadData();
        this.processData();
        this.renderData();
        this.setupListeners();
    }

    async loadData(): Promise<void> { 
        this.data = await API.getData(); 
    }
    
    processData(): void { throw new Error('Implementar processData'); }
    renderData(): void { throw new Error('Implementar renderData'); }
    setupListeners(): void {}
}