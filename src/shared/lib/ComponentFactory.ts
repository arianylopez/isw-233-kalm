import { BaseComponent } from './BaseComponent';

export const ComponentFactory = {
    
    createStaticComponent(tagName, templateId) {
        
        if (customElements.get(tagName)) {
            return;
        }

        class StaticComponent extends BaseComponent {
            get templateId() { return templateId; }
        }

        customElements.define(tagName, StaticComponent);
    }
};