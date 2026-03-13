import Factory from './Factory.js';

export default class Router {
    constructor() {
        if (Router.instance) {
            return Router.instance;
        }
        Router.instance = this;
        
        this.rootElement = document.getElementById('app-root');
        this.init();
    }

    init() {
        window.addEventListener('popstate', () => this.handleRoute());

        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault(); 
                this.navigateTo(link.getAttribute('href'));
            }
        });

        this.handleRoute();
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.handleRoute();
    }

    handleRoute() {
        let path = window.location.pathname;
        if (path === '/index.html') path = '/';

        const component = Factory.createComponent(path);
        
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(component);
        
        this.updateActiveLink(path);
    }

    updateActiveLink(path) {
        document.querySelectorAll('[data-link]').forEach(link => {
            link.classList.remove('sidebar__link--active');
            if (link.getAttribute('href') === path) {
                link.classList.add('sidebar__link--active');
            }
        });
    }
}