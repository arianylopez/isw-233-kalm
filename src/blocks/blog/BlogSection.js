import store from '../../services/Store.js';
import { BaseDataSection } from '../../services/BaseDataSection.js';
import './BlogCard.js'; 

export class BlogSection extends BaseDataSection {
    get templateId() { return 'blog-template'; }

    constructor() {
        super();
        this.blogsData = [];
        this.filteredBlogs = []; 
        this.currentIndex = 0;
        this.itemsPerPage = 4; 
        this.observer = null;
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
        const grid = this.shadowRoot.querySelector('#dynamic-blog-grid');
        const sentinel = this.shadowRoot.querySelector('#blog-sentinel');
        if (!grid) return;
        
        grid.innerHTML = ''; 
        this.currentIndex = 0; 
        sentinel.innerHTML = ''; 
        
        const activeCategory = store.state.activeCategory;

        if (activeCategory === 'Favoritos') {
            this.filteredBlogs = this.blogsData.filter(blog => store.state.favorites.includes(blog.title));
        } else if (activeCategory !== 'Todos') {
            const normalizedActiveCategory = this.normalizeText(activeCategory);
            this.filteredBlogs = this.blogsData.filter(blog => {
                const badgeText = this.normalizeText(blog.badge);
                const categoryText = this.normalizeText(blog.category);
                return badgeText === normalizedActiveCategory || categoryText === normalizedActiveCategory;
            });
        } else {
            this.filteredBlogs = this.blogsData; 
        }

        if (this.filteredBlogs.length === 0) {
            grid.innerHTML = '<p style="color: white; grid-column: 1 / -1; text-align: center;">No hay artículos en esta categoría.</p>';
            return;
        }
        this.loadMoreItems();

        this.setupIntersectionObserver();
    }

    loadMoreItems() {
        const grid = this.shadowRoot.querySelector('#dynamic-blog-grid');
        const sentinel = this.shadowRoot.querySelector('#blog-sentinel');
        
        const nextBatch = this.filteredBlogs.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);

        nextBatch.forEach(blog => {
            const card = document.createElement('blog-card');
            card.setAttribute('title', blog.title);
            card.setAttribute('desc', blog.description);
            card.setAttribute('image', blog.image);
            card.setAttribute('badge', blog.badge);
            card.setAttribute('date', blog.date);
            card.setAttribute('readTime', blog.readTime);
            const fullContent = blog.content ? blog.content : blog.description;
            card.setAttribute('content', fullContent);
            
            grid.appendChild(card);
        });

        this.currentIndex += this.itemsPerPage;

        if (sentinel) {
            if (this.currentIndex >= this.filteredBlogs.length) {
                if (this.observer) this.observer.disconnect();
                sentinel.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No hay más artículos.</p>';
            } else {
                sentinel.innerHTML = '<p style="color: var(--text-white);">Cargando más...</p>';
            }
        }
    }

    setupIntersectionObserver() {
        const sentinel = this.shadowRoot.querySelector('#blog-sentinel');
        
        if (this.observer) this.observer.disconnect();

        if (this.currentIndex >= this.filteredBlogs.length) return;

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => this.loadMoreItems(), 500); 
            }
        }, { 
            root: null, 
            rootMargin: '100px', 
            threshold: 0 
        });

        this.observer.observe(sentinel);
    }

    setupListeners() {
        const btns = this.shadowRoot.querySelectorAll('.blog__filter-btn');
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

        const modal = this.shadowRoot.querySelector('#blogModal');
        const overlay = this.shadowRoot.querySelector('#modalOverlay');
        const closeBtn = this.shadowRoot.querySelector('#modalClose');

        this.addEventListener('open-blog-modal', (e) => {
            if (!modal) {
                console.warn("El HTML del modal no se encontró en el template del blog.");
                return; 
            }

            const data = e.detail;
            
            const modalImg = this.shadowRoot.querySelector('#modalImg');
            const modalTitle = this.shadowRoot.querySelector('#modalTitle');
            const modalDate = this.shadowRoot.querySelector('#modalDate');
            const modalTime = this.shadowRoot.querySelector('#modalTime');
            const modalBadge = this.shadowRoot.querySelector('#modalBadge');
            const modalContent = this.shadowRoot.querySelector('#modalContent');

            if (modalImg) { modalImg.src = data.image; modalImg.alt = data.title; }
            if (modalTitle) modalTitle.textContent = data.title;
            if (modalDate) modalDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${data.date}`;
            if (modalTime) modalTime.innerHTML = `<i class="far fa-clock"></i> ${data.readTime}`;
            if (modalBadge) modalBadge.textContent = data.badge;
            if (modalContent) modalContent.innerHTML = data.content;

            modal.classList.add('blog-modal--active');
            document.body.style.overflow = 'hidden'; 
        });

        const closeModal = () => {
            if (modal) modal.classList.remove('blog-modal--active');
            document.body.style.overflow = ''; 
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
    }
}

customElements.define('blog-section', BlogSection);