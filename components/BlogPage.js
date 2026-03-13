import store from '../core/Store.js';

export default class BlogPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = '';
        
        const template = document.createElement('template');
        template.innerHTML = `
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
        this.appendChild(template.content.cloneNode(true));

        try {
            const response = await fetch('data.json');
            this.blogsData = (await response.json()).blogs;
            
            this.renderBlogs();
            this.setupFilters();

            // PATRÓN OBSERVER: Nos suscribimos a los cambios de favoritos
            store.subscribe('favoritesChanged', () => {
                this.renderBlogs();
            });

        } catch (error) {
            console.error('Error cargando blog:', error);
            this.querySelector('#dynamic-blog-grid').innerHTML = '<p style="color: white;">Error al cargar.</p>';
        }
    }

    setupFilters() {
        const btns = this.querySelectorAll('.blog__filter-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                store.state.activeCategory = e.target.dataset.category;
                this.renderBlogs();
            });
        });
    }

    renderBlogs() {
        const grid = this.querySelector('#dynamic-blog-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        const activeCategory = store.state.activeCategory;

        let filteredBlogs = this.blogsData;
        if (activeCategory === 'Favoritos') {
            filteredBlogs = this.blogsData.filter(blog => store.state.favorites.includes(blog.title));
        } else if (activeCategory !== 'Todos') {
            filteredBlogs = this.blogsData.filter(blog => blog.badge === activeCategory);
        }

        if (filteredBlogs.length === 0) {
            grid.innerHTML = '<p style="color: white;">No hay artículos en esta categoría.</p>';
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
}

customElements.define('blog-page', BlogPage);