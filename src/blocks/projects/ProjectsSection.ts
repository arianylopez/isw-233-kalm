import { BaseDataSection } from '../../services/BaseDataSection';

export interface Project {
    title: string;
    description: string;
    image: string;
    githubLink: string;
    tags: string[];
}

export class ProjectsSection extends BaseDataSection {
    projectsList: Project[];
    resizeObserver: ResizeObserver | null;

    get templateId(): string { return 'projects-template'; }

    constructor() {
        super();
        this.projectsList = [];
        this.resizeObserver = null; 
    }

    processData(): void {
        if (this.data && this.data.projects) {
            this.projectsList = this.data.projects;
        }
    }

    renderData(): void {
        const grid = this.shadowRoot!.querySelector('#dynamic-projects-grid') as HTMLElement | null;
        if (!grid) return;
        
        grid.innerHTML = ''; 

        this.projectsList.forEach((project: Project) => {
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

    setupListeners(): void {
        const grid = this.shadowRoot!.querySelector('#dynamic-projects-grid') as HTMLElement | null;
        if (!grid) return;

        if (this.resizeObserver) this.resizeObserver.disconnect();

        this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const currentWidth = entry.contentRect.width;

                if (currentWidth < 650) {
                    grid.style.gridTemplateColumns = '1fr'; 
                } else {
                    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
                }
            }
        });

        this.resizeObserver.observe(grid);
    }

    disconnectedCallback(): void {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
}

if (!customElements.get('projects-section')) {
    customElements.define('projects-section', ProjectsSection);
}