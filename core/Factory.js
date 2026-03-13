export default class Factory {
    static createComponent(path) {
        const routes = {
            '/': 'home-page',
            '/about': 'about-page',
            '/curriculum': 'resume-page',
            '/proyectos': 'projects-page',
            '/blog': 'blog-page',
            '/contacto': 'contact-page'
        };

        const tagName = routes[path] || 'home-page';
        return document.createElement(tagName);
    }
}