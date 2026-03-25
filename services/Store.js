import Observer from './Observer.js';

class Store extends Observer {
    constructor() {
        super(); 
        
        if (Store.instance) {
            return Store.instance;
        }
        Store.instance = this;
        let savedFavorites = [];
        try {
            const data = localStorage.getItem('blog_favorites');
            if (data) {
                savedFavorites = JSON.parse(data);
                if (!Array.isArray(savedFavorites)) savedFavorites = []; 
            }
        } catch (e) {
            console.error("Error al leer favoritos del navegador:", e);
            savedFavorites = [];
        }

        this.state = {
            favorites: savedFavorites,
            activeCategory: 'Todos'
        };
    }

    toggleFavorite(blogTitle) {
        if (!this.state.favorites) this.state.favorites = [];

        const index = this.state.favorites.indexOf(blogTitle);
        
        if (index > -1) {
            this.state.favorites.splice(index, 1);
        } else {
            this.state.favorites.push(blogTitle);
        }
        
        try {
            localStorage.setItem('blog_favorites', JSON.stringify(this.state.favorites));
        } catch (e) {
            console.error("Error al guardar favoritos:", e);
        }
        
        this.notify('favoritesChanged', this.state.favorites);
    }
}

export default new Store();