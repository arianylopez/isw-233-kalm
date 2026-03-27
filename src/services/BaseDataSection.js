import { API } from './API.js';
import { BaseComponent } from './BaseComponent.js'; 

export class BaseDataSection extends BaseComponent { 
    constructor() {
        super(); 
        this.data = null; 
    }

    async connectedCallback() {
        super.connectedCallback(); 

        await this.loadData();
        this.processData();
        this.renderData();
        this.setupListeners();
    }

    async loadData() {
        this.data = await API.getData();
    }

    processData() { throw new Error('Implementar processData'); }
    renderData() { throw new Error('Implementar renderData'); }
    setupListeners() {}
}