import store from '../../shared/lib/Store';
import { BaseDataSection } from '../../shared/lib/BaseDataSection';
import './BlogCard'; 

export interface Blog {
    title: string;
    description: string;
    image: string;
    badge: string;
    date: string;
    readTime: string;
    content?: string; 
    category: string;
}

export class BlogSection extends BaseDataSection {
    blogsData: Blog[];
    filteredBlogs: Blog[];
    currentIndex: number;
    itemsPerPage: number;
    observer: IntersectionObserver | null;

    get templateId(): string { return 'blog-template'; }

    constructor() {
        super();
        this.blogsData = [];
        this.filteredBlogs = []; 
        this.currentIndex = 0;
        this.itemsPerPage = 4; 
        this.observer = null;
    }

    processData(): void {
        if (this.data && this.data.blogs) {
            this.blogsData = this.data.blogs;
        } else {
            this.blogsData = [];
        }
    }

    normalizeText(text: string | null | undefined): string {
        if (!text) return "";
        return text.trim().toLowerCase();
    }

    renderData(): void {
        const grid = this.shadowRoot!.querySelector('#dynamic-blog-grid') as HTMLElement | null;
        const sentinel = this.shadowRoot!.querySelector('#blog-sentinel') as HTMLElement | null;
        
        if (!grid) return;
        
        grid.innerHTML = ''; 
        this.currentIndex = 0; 
        if (sentinel) sentinel.innerHTML = ''; 
        
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

    loadMoreItems(): void {
        const grid = this.shadowRoot!.querySelector('#dynamic-blog-grid') as HTMLElement | null;
        const sentinel = this.shadowRoot!.querySelector('#blog-sentinel') as HTMLElement | null;
        
        if (!grid) return;

        const nextBatch = this.filteredBlogs.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);

        nextBatch.forEach((blog: Blog) => {
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

    setupIntersectionObserver(): void {
        const sentinel = this.shadowRoot!.querySelector('#blog-sentinel') as HTMLElement | null;
        if (!sentinel) return;
        
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

    setupListeners(): void {
        const btns = this.shadowRoot!.querySelectorAll('.blog__filter-btn') as NodeListOf<HTMLElement>;
        btns.forEach(btn => {
            btn.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLElement;
                if (target.dataset.category) {
                    store.state.activeCategory = target.dataset.category;
                    this.renderData();
                }
            });
        });

        store.subscribe('favoritesChanged', () => {
            if (store.state.activeCategory === 'Favoritos') {
                this.renderData();
            }
        });

        const modal = this.shadowRoot!.querySelector('#blogModal') as HTMLElement | null;
        const overlay = this.shadowRoot!.querySelector('#modalOverlay') as HTMLElement | null;
        const closeBtn = this.shadowRoot!.querySelector('#modalClose') as HTMLElement | null;

        this.addEventListener('open-blog-modal', (e: Event) => {
            const customEvent = e as CustomEvent;
            
            if (!modal) {
                console.warn("El HTML del modal no se encontró en el template del blog.");
                return; 
            }

            const data = customEvent.detail;
            
            const modalImg = this.shadowRoot!.querySelector('#modalImg') as HTMLImageElement | null;
            const modalTitle = this.shadowRoot!.querySelector('#modalTitle') as HTMLElement | null;
            const modalDate = this.shadowRoot!.querySelector('#modalDate') as HTMLElement | null;
            const modalTime = this.shadowRoot!.querySelector('#modalTime') as HTMLElement | null;
            const modalBadge = this.shadowRoot!.querySelector('#modalBadge') as HTMLElement | null;
            const modalContent = this.shadowRoot!.querySelector('#modalContent') as HTMLElement | null;

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

if (!customElements.get('blog-section')) {
    customElements.define('blog-section', BlogSection);
}