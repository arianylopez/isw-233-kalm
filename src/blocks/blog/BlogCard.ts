import store from '../../services/Store'; 

export class BlogCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.shadowRoot.querySelector('.blog-card')) return;

        const title = this.getAttribute('title') || '';
        const desc = this.getAttribute('desc') || '';
        const image = this.getAttribute('image') || '';
        const badge = this.getAttribute('badge') || '';
        const date = this.getAttribute('date') || '';
        const readTime = this.getAttribute('readTime') || '';
        const content = this.getAttribute('content') || ''; 

        document.querySelectorAll('style, link[rel="stylesheet"]').forEach(styleNode => {
            this.shadowRoot.appendChild(styleNode.cloneNode(true));
        });

        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        this.shadowRoot.appendChild(faLink);

        const template = document.getElementById('blog-card-template');
        if (!template) return; 
        
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const imgEl = this.shadowRoot.querySelector('.blog-card__img');
        const badgeEl = this.shadowRoot.querySelector('.blog-card__badge');
        const titleEl = this.shadowRoot.querySelector('.blog-card__title');
        const descEl = this.shadowRoot.querySelector('.blog-card__desc');
        const dateEl = this.shadowRoot.querySelector('.blog-card__date-text');
        const timeEl = this.shadowRoot.querySelector('.blog-card__time-text');
        const favBtn = this.shadowRoot.querySelector('.blog-card__fav-btn');

        if (imgEl) {
            imgEl.src = image;
            imgEl.alt = title;
        }
        if (badgeEl) badgeEl.textContent = badge;
        if (titleEl) titleEl.textContent = title;
        if (descEl) descEl.textContent = desc;
        
        if (dateEl) dateEl.innerHTML = `<i class="far fa-calendar-alt"></i> ${date}`;
        if (timeEl) timeEl.innerHTML = `<i class="far fa-clock"></i> ${readTime}`;

        if (favBtn) {
            const heartIcon = favBtn.querySelector('i');
            const favorites = (store.state && store.state.favorites) ? store.state.favorites : [];
            const isFavorite = favorites.includes(title);
            
            if (isFavorite) {
                if (heartIcon) heartIcon.className = 'fas fa-heart';
                favBtn.style.color = '#D32F2F'; 
            } else {
                if (heartIcon) heartIcon.className = 'far fa-heart';
                favBtn.style.color = 'var(--text-light)';
            }

            favBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                store.toggleFavorite(title);

                const isNowFavorite = store.state.favorites.includes(title);
                if (isNowFavorite) {
                    if (heartIcon) heartIcon.className = 'fas fa-heart';
                    favBtn.style.color = '#D32F2F'; 
                } else {
                    if (heartIcon) heartIcon.className = 'far fa-heart';
                    favBtn.style.color = 'var(--text-light)';
                }
            });
        }

        this.shadowRoot.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('open-blog-modal', {
                bubbles: true,
                composed: true, 
                detail: { title, desc, image, badge, date, readTime, content }
            }));
        });
    }
}

if (!customElements.get('blog-card')) {
    customElements.define('blog-card', BlogCard);
}