type CallbackFunction = (data?: any) => void;

export default class Observer {
    listeners: { [event: string]: CallbackFunction[] };

    constructor() {
        this.listeners = {};
    }

    subscribe(event: string, callback: CallbackFunction): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    notify(event: string, data?: any): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}