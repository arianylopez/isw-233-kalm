import { ROUTES } from './API';

const Router = {
    go(route: string, addToHistory: boolean = true): void {
        if (addToHistory) {
            history.pushState({ route }, "", route);
        }

        const routesDict: Record<string, string> = ROUTES;
        const sectionId = routesDict[route];
        
        const section = sectionId ? document.getElementById(sectionId) : null;
        
        if (!section) {
            window.scrollTo(0, 0); 
            return;
        }

        section.scrollIntoView({ behavior: 'smooth' });
        this.updateActiveLink(route);
    },

    updateActiveLink(route: string): void {
        document.querySelectorAll('[data-link]').forEach(link => {
            link.classList.remove('sidebar__link--active');
            if (link.getAttribute('href') === route) {
                link.classList.add('sidebar__link--active');
            }
        });
    },

    init(): void {
        document.querySelectorAll("[data-link]").forEach((link) => {
            link.addEventListener("click", (event: Event) => {
                event.preventDefault();
                
                const target = event.currentTarget as HTMLElement;
                const href = target.getAttribute("href");
                
                if (href) {
                    this.go(href);
                }
            });
        });

        window.addEventListener("popstate", (event: PopStateEvent) => {
            const route = event.state?.route || window.location.pathname;
            this.go(route, false);
        });

        setTimeout(() => {
            this.go(window.location.pathname, false);
        }, 100);
    }
};

export default Router;