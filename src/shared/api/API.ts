export const ROUTES = {
    "/": "home",
    "/about": "about",
    "/curriculum": "curriculum",
    "/proyectos": "projects",
    "/blog": "blog",
    "/contacto": "contact"
};

export const API = {
    url: "./data/data.json",
    
    getData: async () => {
        try {
            const response = await fetch(API.url);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error al cargar los datos desde la API:", error);
            return null;
        }
    }
};