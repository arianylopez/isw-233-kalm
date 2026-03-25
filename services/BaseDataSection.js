import { API } from './API.js';

export class BaseDataSection extends HTMLElement {
    constructor() {
        super();
        this.data = null; 
    }

    async connectedCallback() {
        await this.loadData();
        this.processData();
        this.renderData();
        this.setupListeners();
    }

    async loadData() {
        this.data = await API.getData();
    }

    processData() {
        throw new Error('El método processData() debe ser implementado');
    }

    renderData() {
        throw new Error('El método renderData() debe ser implementado');
    }

    setupListeners() {}
}