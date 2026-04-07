import { API } from './API.js';

export class BaseDataSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = null; 
    }

    get templateId() { return ''; } 

    async connectedCallback() {
        if (this.shadowRoot.childNodes.length === 0) {
            document.querySelectorAll('style, link[rel="stylesheet"]').forEach(styleNode => {
                this.shadowRoot.appendChild(styleNode.cloneNode(true));
            });

            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            this.shadowRoot.appendChild(faLink);

            const template = document.getElementById(this.templateId);
            if (template) {
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            }
        }

        await this.loadData();
        this.processData();
        this.renderData();
        this.setupListeners();
    }

    async loadData() { this.data = await API.getData(); }
    processData() { throw new Error('Implementar processData'); }
    renderData() { throw new Error('Implementar renderData'); }
    setupListeners() {}
}