import Observer from './Observer.js';

class Store extends Observer {
    constructor() {
        super();
        
        // SINGLETON: Garantiza una única instancia
        if (Store.instance) {
            return Store.instance;
        }
        Store.instance = this;

        const savedFavorites = JSON.parse(localStorage.getItem('blog_favorites')) || [];

        const initialState = {
            favorites: savedFavorites,
            activeCategory: 'Todos'
        };

        // PROXY: Intercepta mutaciones del estado para hacerlas reactivas
        this.state = new Proxy(initialState, {
            set: (target, property, value) => {
                target[property] = value;
                
                if (property === 'favorites') {
                    localStorage.setItem('blog_favorites', JSON.stringify(value));
                }
                
                this.notify(`${property}Changed`, value);
                return true; 
            }
        });
    }

    toggleFavorite(blogTitle) {
        const favs = [...this.state.favorites];
        const index = favs.indexOf(blogTitle);
        
        if (index > -1) {
            favs.splice(index, 1);
        } else {
            favs.push(blogTitle);
        }
        
        this.state.favorites = favs; 
    }
}

export default new Store();