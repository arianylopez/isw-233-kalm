import store from '../../services/Store.js';
import { BaseDataSection } from '../../services/BaseDataSection.js';
import './BlogCard.js'; 

export class BlogSection extends BaseDataSection {
    constructor() {
        super();
        
        const template = document.getElementById('blog-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        } else {
            console.error('No se encontró el template: blog-template en index.html');
        }
        
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
        const grid = this.querySelector('#dynamic-blog-grid');
        const sentinel = this.querySelector('#blog-sentinel');
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
        const grid = this.querySelector('#dynamic-blog-grid');
        const sentinel = this.querySelector('#blog-sentinel');
        
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

        if (this.currentIndex >= this.filteredBlogs.length) {
            if (this.observer) this.observer.disconnect();
            sentinel.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">No hay más artículos.</p>';
        } else {
            sentinel.innerHTML = '<p style="color: var(--text-white);">Cargando más...</p>'; // Muestra esto mientras bajas
        }
    }

    setupIntersectionObserver() {
        const sentinel = this.querySelector('#blog-sentinel');
        
        if (this.observer) this.observer.disconnect();

        if (this.currentIndex >= this.filteredBlogs.length) return;

        this.observer = new IntersectionObserver((entries) => {
            const sentinelEntry = entries[0];

            if (sentinelEntry.isIntersecting) {
                
                setTimeout(() => {
                    this.loadMoreItems();
                }, 500); 
                
            }
        }, {
            root: null, 
            rootMargin: '100px', 
            threshold: 0 
        });

        this.observer.observe(sentinel);
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

        const modal = this.querySelector('#blogModal');
        const overlay = this.querySelector('#modalOverlay');
        const closeBtn = this.querySelector('#modalClose');

        this.addEventListener('open-blog-modal', (e) => {
            const data = e.detail;
            this.querySelector('#modalImg').src = data.image;
            this.querySelector('#modalImg').alt = data.title;
            this.querySelector('#modalTitle').textContent = data.title;
            this.querySelector('#modalDate').innerHTML = `<i class="far fa-calendar-alt"></i> ${data.date}`;
            this.querySelector('#modalTime').innerHTML = `<i class="far fa-clock"></i> ${data.readTime}`;
            this.querySelector('#modalBadge').textContent = data.badge;
            this.querySelector('#modalContent').innerHTML = data.content;

            modal.classList.add('blog-modal--active');
            document.body.style.overflow = 'hidden'; 
        });

        const closeModal = () => {
            modal.classList.remove('blog-modal--active');
            document.body.style.overflow = ''; 
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }
}

customElements.define('blog-section', BlogSection);