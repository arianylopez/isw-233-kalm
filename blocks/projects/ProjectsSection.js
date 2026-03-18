import { BaseDataSection } from '../../services/BaseDataSection.js';

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

export class ProjectsSection extends BaseDataSection {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.projectsList = [];
    }

    processData() {
        if (this.data && this.data.projects) {
            this.projectsList = this.data.projects;
        }
    }

    renderData() {
        const grid = this.querySelector('#dynamic-projects-grid');
        if (!grid) return;

        grid.innerHTML = ''; 

        this.projectsList.forEach(project => {
            const tagsHtml = project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('');

            grid.innerHTML += `
                <article class="project-card">
                    <div class="project-card__image-box">
                        <img src="${project.image}" alt="${project.title}" class="project-card__img">
                        <a href="${project.githubLink}" target="_blank" class="project-card__github"><i class="fab fa-github"></i></a>
                    </div>
                    <div class="project-card__content">
                        <h3 class="project-card__title">${project.title}</h3>
                        <p class="project-card__desc">${project.description}</p>
                        <div class="project-card__tags">${tagsHtml}</div>
                    </div>
                </article>
            `;
        });
    }
}

customElements.define('projects-section', ProjectsSection);