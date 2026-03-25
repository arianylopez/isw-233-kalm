import { BaseDataSection } from '../../services/BaseDataSection.js';

export class ProjectsSection extends BaseDataSection {
    constructor() {
        super();
        const template = document.getElementById('projects-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        } else {
            console.error('No se encontró el template: projects-template en index.html');
        }
        
        this.projectsList = [];
        this.dataUrl = './data/data.json'; 
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