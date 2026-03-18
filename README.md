# Portafolio SPA - Ariany Lopez

Este proyecto es una Single Page Application (SPA) construida con Vanilla JavaScript, Web Components nativos y CSS bajo la metodología BEM.

## Patrones de Diseño Implementados

Para garantizar una arquitectura escalable y un código mantenible, se han implementado 4 patrones de diseño de software en la lógica del proyecto:

### 1. Patrón Singleton (Creacional)
* **Dónde se usó:** En `services/Router.js` y `services/Store.js`.
* **Por qué se usó:** Necesitábamos asegurar que toda la aplicación compartiera exactamente la misma instancia del enrutador (para no tener conflictos con la History API) y la misma instancia del estado global (para que los favoritos no se desincronicen). El Singleton restringe la instanciación de estas clases a un único objeto global.

### 2. Patrón Observer (Comportamiento)
* **Dónde se usó:** Implementado como clase base en `services/Observer.js` y extendido por `services/Store.js`. Las suscripciones ocurren en `blocks/blog/BlogSection.js`.
* **Por qué se usó:** Para desacoplar la base de datos (Store) de la interfaz gráfica (UI). Cuando un usuario marca un artículo como favorito en una tarjeta, el Store emite una notificación. El `BlogSection` (que actúa como observador) escucha este cambio y vuelve a renderizar la grilla de artículos automáticamente sin que las clases dependan rígidamente unas de otras.

### 3. Patrón Proxy (Estructural)
* **Dónde se usó:** En el constructor de `services/Store.js`.
* **Por qué se usó:** Se utilizó para interceptar dinámicamente cualquier mutación que se le haga al estado de la aplicación (ej. cuando se agrega un nuevo favorito al array). Al usar un Proxy sobre el objeto de estado, podemos inyectar lógica automática para guardar los datos en `localStorage` y emitir notificaciones del Observer justo en el momento en que el valor cambia, sin tener que llamar a funciones de guardado manualmente.

### 4. Patrón Template Method (Comportamiento)
* **Dónde se usó:** En la clase `services/BaseDataSection.js`, la cual es heredada por `blocks/projects/ProjectsSection.js` y `blocks/blog/BlogSection.js`.
* **Por qué se usó:** Las secciones de Proyectos y Blog compartían un algoritmo idéntico: cargar datos de un JSON, procesarlos, renderizarlos y configurar eventos. El Template Method nos permitió definir este "esqueleto" secuencial en el método `connectedCallback` de la clase base, forzando a las subclases a sobrescribir únicamente los pasos específicos (como el `renderData`) evitando así la duplicación de código asíncrono.

## 5. Diseño (Figma)

El diseño visual y la experiencia de usuario fueron prototipados previamente. El diseño se encuentra en el siguiente enlace:

[Ver proyecto en Figma](https://www.figma.com/design/QG7T3aoa2EUJzReh0Jrmou/CV?node-id=0-1&t=A5LQg9W8XbjZzCVF-1) 
