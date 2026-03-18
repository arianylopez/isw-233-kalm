export class BaseDataSection extends HTMLElement {
    constructor() {
        super();
        this.data = null; 
        this.dataUrl = './data/data.json'; 
    }

    async connectedCallback() {
        await this.loadData();
        this.processData();
        this.renderData();
        this.setupListeners();
    }

    async loadData() {
        try {
            const response = await fetch(this.dataUrl);
            this.data = await response.json();
        } catch (error) {
            console.error(`Error cargando los datos desde ${this.dataUrl}:`, error);
        }
    }

    processData() { throw new Error('Implementar processData'); }
    renderData() { throw new Error('Implementar renderData'); }
    setupListeners() {}
}