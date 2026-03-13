import store from '../core/Store.js';

export default class BlogCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title');
        const desc = this.getAttribute('desc');
        const image = this.getAttribute('image');
        const badge = this.getAttribute('badge');
        const date = this.getAttribute('date');
        const readTime = this.getAttribute('readTime');

        const isFavorite = store.state.favorites.includes(title);
        const heartClass = isFavorite ? 'fas fa-heart' : 'far fa-heart';
        const heartColor = isFavorite ? '#D32F2F' : 'var(--text-light)';

        const template = document.createElement('template');
        template.innerHTML = `
            <article class="blog-card">
                <div class="blog-card__image-box">
                    <img src="${image}" alt="${title}" class="blog-card__img">
                    <span class="blog-card__badge">${badge}</span>
                </div>
                <div class="blog-card__content">
                    <div class="blog-card__meta" style="display: flex; justify-content: space-between;">
                        <div>
                            <span><i class="far fa-calendar-alt"></i> ${date}</span>
                            <span style="margin-left: 10px;"><i class="far fa-clock"></i> ${readTime}</span>
                        </div>
                        <button class="blog-card__fav-btn" style="background: none; border: none; cursor: pointer; font-size: 1.2rem; color: ${heartColor}; transition: transform 0.2s;">
                            <i class="${heartClass}"></i>
                        </button>
                    </div>
                    <h3 class="blog-card__title">${title}</h3>
                    <p class="blog-card__desc">${desc}</p>
                </div>
            </article>
        `;

        this.innerHTML = '';
        this.appendChild(template.content.cloneNode(true));

        const favBtn = this.querySelector('.blog-card__fav-btn');
        favBtn.addEventListener('click', () => {
            store.toggleFavorite(title);
        });
    }
}

customElements.define('blog-card', BlogCard);