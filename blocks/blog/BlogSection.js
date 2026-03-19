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
                </div>
            
            <div id="blog-sentinel" style="height: 50px; width: 100%; display: flex; justify-content: center; align-items: center; margin-top: 20px;">
                </div>
        </div>

        <div class="blog-modal" id="blogModal">
            <div class="blog-modal__overlay" id="modalOverlay"></div>
            <div class="blog-modal__box">
                <button class="blog-modal__close" id="modalClose"><i class="fas fa-times"></i></button>
                <img src="" alt="" class="blog-modal__header-img" id="modalImg">
                <div class="blog-modal__body">
                    <div class="blog-modal__meta">
                        <span id="modalDate"><i class="far fa-calendar-alt"></i> </span>
                        <span id="modalTime"><i class="far fa-clock"></i> </span>
                        <span id="modalBadge" style="color: var(--accent-main); font-weight: bold;"></span>
                    </div>
                    <h2 class="blog-modal__title" id="modalTitle"></h2>
                    <div class="blog-modal__content-text" id="modalContent"></div>
                </div>
            </div>
        </div>
    </section>
`;

export class BlogSection extends BaseDataSection {
    constructor() {
        super();
        this.appendChild(sectionTemplate.content.cloneNode(true));
        
        this.dataUrl = './data/data.json'; 
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