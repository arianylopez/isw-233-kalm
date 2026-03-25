import store from '../../services/Store.js'; 

export class BlogCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title');
        const desc = this.getAttribute('desc');
        const image = this.getAttribute('image');
        const badge = this.getAttribute('badge');
        const date = this.getAttribute('date');
        const readTime = this.getAttribute('readTime');
        const content = this.getAttribute('content'); 

        const template = document.getElementById('blog-card-template');
        if (template) {
            this.appendChild(template.content.cloneNode(true));
        }

        this.querySelector('.blog-card__img').src = image;
        this.querySelector('.blog-card__img').alt = title;
        this.querySelector('.blog-card__badge').textContent = badge;
        this.querySelector('.blog-card__title').textContent = title;
        this.querySelector('.blog-card__desc').textContent = desc;
        this.querySelector('.blog-card__date-text').innerHTML += date;
        this.querySelector('.blog-card__time-text').innerHTML += readTime;

        const favBtn = this.querySelector('.blog-card__fav-btn');
        const heartIcon = favBtn.querySelector('i');
        
        const isFavorite = store.state.favorites.includes(title);
        if (isFavorite) {
            heartIcon.className = 'fas fa-heart';
            favBtn.style.color = '#D32F2F'; 
        } else {
            heartIcon.className = 'far fa-heart';
            favBtn.style.color = 'var(--text-light)';
        }

        favBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            store.toggleFavorite(title);

            const isNowFavorite = store.state.favorites.includes(title);
            if (isNowFavorite) {
                heartIcon.className = 'fas fa-heart';
                favBtn.style.color = '#D32F2F'; 
            } else {
                heartIcon.className = 'far fa-heart';
                favBtn.style.color = 'var(--text-light)';
            }
        });

        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('open-blog-modal', {
                bubbles: true,
                composed: true,
                detail: { title, desc, image, badge, date, readTime, content }
            }));
        });
    }
}

customElements.define('blog-card', BlogCard);