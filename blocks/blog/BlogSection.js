import store from '../../services/Store.js';
import { BaseDataSection } from '../../services/BaseDataSection.js';
import './BlogCard.js'; 

const sectionTemplate = document.createElement('template');
sectionTemplate.innerHTML = `
            <section class="blog">
                <div class="blog__container">
                    <div class="blog__header-area">
                        <div class="blog__titles">
                            <span class="blog__subtitle">BLOG</span>
                            <h2 class="blog__title">Artículos Recientes</h2>
                            <div class="blog__line"></div>
                            <div class="blog__description-box">
                                <p class="blog__description">Comparto conocimientos y reflexiones.</p>
                            </div>
                        </div>
                        <div class="blog__avatar">
                            <img src="img/avatar-thinking.png" alt="Pensando" class="blog__avatar-img">
                        </div>
                    </div>

                    <div class="blog__filters" style="margin-bottom: 30px; display: flex; gap: 15px; flex-wrap: wrap;">
                        <button class="btn btn--outline blog__filter-btn" data-category="Todos">Todos</button>
                        <button class="btn btn--outline blog__filter-btn" data-category="Tecnología">Tecnología</button>
                        <button class="btn btn--outline blog__filter-btn" data-category="Arquitectura">Arquitectura</button>
                        <button class="btn btn--white blog__filter-btn" data-category="Favoritos">❤️ Mis Favoritos</button>
                    </div>

                    <div class="blog__grid" id="dynamic-blog-grid">
                        <p style="color: white;">Cargando artículos...</p>
                    </div>
                </div>
            </section>
        `;

export class BlogSection extends BaseDataSection {
    constructor() {
        super();
        this.appendChild(sectionTemplate.content.cloneNode(true));
        this.blogsData = [];
        this.dataUrl = './data/data.json'; 
    }

    processData() {
        if (this.data && this.data.blogs) {
            this.blogsData = this.data.blogs;
        } else {
            this.blogsData = [];
        }
    }

    normalizeText(text) {
        if (!text) return "";
        return text.trim().toLowerCase();
    }

    renderData() {
        const grid = this.querySelector('#dynamic-blog-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        const activeCategory = store.state.activeCategory;

        let filteredBlogs = this.blogsData;
        
        if (activeCategory === 'Favoritos') {
            filteredBlogs = this.blogsData.filter(blog => store.state.favorites.includes(blog.title));
        } else if (activeCategory !== 'Todos') {
            const normalizedActiveCategory = this.normalizeText(activeCategory);
            
            filteredBlogs = this.blogsData.filter(blog => {
                const badgeText = this.normalizeText(blog.badge);
                const categoryText = this.normalizeText(blog.category);
                
                return badgeText === normalizedActiveCategory || categoryText === normalizedActiveCategory;
            });
        }

        if (filteredBlogs.length === 0) {
            grid.innerHTML = '<p style="color: white; grid-column: 1 / -1; text-align: center;">No hay artículos en esta categoría.</p>';
            return;
        }

        filteredBlogs.forEach(blog => {
            const card = document.createElement('blog-card');
            card.setAttribute('title', blog.title);
            card.setAttribute('desc', blog.description);
            card.setAttribute('image', blog.image);
            card.setAttribute('badge', blog.badge);
            card.setAttribute('date', blog.date);
            card.setAttribute('readTime', blog.readTime);
            
            grid.appendChild(card);
        });
    }

    setupListeners() {
        const btns = this.querySelectorAll('.blog__filter-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                store.state.activeCategory = e.target.dataset.category;
                this.renderData();
            });
        });

        store.subscribe('favoritesChanged', () => {
            if (store.state.activeCategory === 'Favoritos') {
                this.renderData();
            }
        });
    }
}

customElements.define('blog-section', BlogSection);