const Router = {
    routes: {
        "/": "home",
        "/about": "about",
        "/curriculum": "curriculum",
        "/proyectos": "projects",
        "/blog": "blog",
        "/contacto": "contact"
    },

    go(route, addToHistory = true) {
        if (addToHistory) {
            history.pushState({ route }, "", route);
        }

        const sectionId = this.routes[route];
        const section = sectionId ? document.getElementById(sectionId) : null;
        
        if (!section) {
            window.scrollTo(0, 0); 
            return;
        }

        section.scrollIntoView({ behavior: 'smooth' });
        this.updateActiveLink(route);
    },

    updateActiveLink(route) {
        document.querySelectorAll('[data-link]').forEach(link => {
            link.classList.remove('sidebar__link--active');
            if (link.getAttribute('href') === route) {
                link.classList.add('sidebar__link--active');
            }
        });
    },

    init() {
        document.querySelectorAll("[data-link]").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const href = event.currentTarget.getAttribute("href");
                this.go(href);
            });
        });

        window.addEventListener("popstate", (event) => {
            const route = event.state?.route || window.location.pathname;
            this.go(route, false);
        });

        setTimeout(() => {
            this.go(window.location.pathname, false);
        }, 100);
    }
};

export default Router;