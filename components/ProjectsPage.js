export default class ProjectsPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = '';

        const template = document.createElement('template');
        template.innerHTML = `
            <section class="projects">
                <div class="projects__container">
                    <div class="projects__header">
                        <span class="projects__subtitle">PORTAFOLIO</span>
                        <h2 class="projects__title">Proyectos destacados</h2>
                        <div class="projects__line"></div>
                    </div>
                    
                    <div class="projects__grid" id="dynamic-projects-grid">
                        <p>Cargando proyectos...</p>
                    </div>
                </div>
            </section>
        `;
        this.appendChild(template.content.cloneNode(true));

        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('Error en la red al obtener data.json');
            
            const data = await response.json();
            this.renderProjects(data.projects);
            
        } catch (error) {
            console.error('Error cargando proyectos:', error);
            const grid = this.querySelector('#dynamic-projects-grid');
            if (grid) grid.innerHTML = '<p>Error al cargar los proyectos. Verifica tu conexión o el archivo JSON.</p>';
        }
    }

    renderProjects(projects) {
        const grid = this.querySelector('#dynamic-projects-grid');
        if (!grid) return;

        grid.innerHTML = '';

        projects.forEach(project => {
            const tagsHtml = project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('');

            const cardHTML = `
                <article class="project-card">
                    <div class="project-card__image-box">
                        <img src="${project.image}" alt="${project.title}" class="project-card__img">
                        <a href="${project.githubLink}" target="_blank" class="project-card__github" title="Ver en GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                    <div class="project-card__content">
                        <h3 class="project-card__title">${project.title}</h3>
                        <p class="project-card__desc">${project.description}</p>
                        <div class="project-card__tags">
                            ${tagsHtml}
                        </div>
                    </div>
                </article>
            `;
            grid.innerHTML += cardHTML;
        });
    }
}

customElements.define('projects-page', ProjectsPage);