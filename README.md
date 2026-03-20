# 📂 Portafolio Personal - Arquitectura y Metodología BEM

## 1. Introducción

Este repositorio contiene el código fuente de mi Portafolio Web Personal. Como estudiante de Ingeniería de Software en la Universidad Católica Boliviana (UCB), este proyecto es tanto mi carta de presentación digital como una demostración práctica de mis conocimientos en arquitectura de software y diseño de interfaces.

El objetivo principal de esta refactorización ha sido migrar de una estructura monolítica a una arquitectura modular y escalable utilizando la metodología **BEM (Block, Element, Modifier)**, aplicando principios de "Clean Code" y asegurando un mantenimiento eficiente a largo plazo.

## 2. Metodología y Arquitectura

El proyecto adopta un enfoque modular donde la estructura (HTML), la presentación (CSS) y el comportamiento (JS) se piensan en términos de componentes independientes:

* **BEM en CSS:** Los estilos están encapsulados para evitar colisiones, utilizando una nomenclatura estricta (`bloque__elemento--modificador`).
* **Lógica Tradicional en JS:** Para el comportamiento interactivo (validaciones, menú activo, cambio de tema), se prioriza el uso de lógica tradicional (ciclos `for` clásicos y estructuras condicionales `if/else` explícitas) en lugar de funciones de orden superior o librerías externas. Esto garantiza una comprensión fundamental de los algoritmos y un control absoluto sobre el flujo de ejecución del navegador.

## 3. Estructura de Directorios

El código fuente se divide en bloques lógicos que luego se unifican en un entorno de "build" (archivos centrales de distribución).

```
portafolio/
├── index.html               # Estructura principal llamando a los bundles
├── img/                     # Recursos gráficos
├── blocks/                  # Módulos independientes según BEM
│   ├── about/
|   ├── blog/
│   ├── button/
│   ├── contact-form/
│   ├── core/
|   ├── footer/
│   ├── hero/
│   ├── project-card/
|   ├── resume/
│   └── sidebar/
├── styles.css               # Archivo de ensamblaje (Build CSS)
└── script.js                # Archivo de ensamblaje (Build JS)
```
## 4. Bloques Identificados y Refactorizados
Durante la refactorización, el monolito original se dividió en los siguientes bloques clave:

### - core (Variables y Base)
Actúa como la única fuente de verdad para el diseño del sitio. Contiene las variables globales (paleta de colores en tonos tierra, bordes redondeados, transiciones) y los estilos base compartidos (como .section-title y divisores).

### - sidebar (Navegación y Tema)
Encapsula la barra lateral izquierda, los enlaces de navegación (navbar) y el interruptor de Modo Oscuro (theme-toggle). Su lógica iterativa en JS detecta la posición del scroll para iluminar el enlace activo sin interferir con otros scripts.

### - hero
Contiene la sección de bienvenida. Se estructuró para mantener los textos y la imagen del avatar en sus propios contenedores (hero__text y hero__image-container), asegurando que el diseño sea completamente responsivo.

### - about
Bloque destinado a la sección "Sobre mí". El contenido está diseñado para enfocarse estrictamente en la personalidad y habilidades blandas (soft skills) de la autora mediante etiquetas limpias (tags__item), separando la demostración técnica para otras secciones del portafolio.

### - button
Un bloque transversal y reutilizable. Se eliminó la dependencia de las clases genéricas antiguas para crear un componente .button base con modificadores específicos (--white, --outline-white, --submit) que pueden inyectarse en el Hero, el Formulario o cualquier vista futura.

### - project-card
Componente diseñado para la galería del portafolio. Encapsula la imagen de previsualización, la descripción del proyecto y el botón flotante de GitHub. Su estructura asegura que un cambio en la tarjeta no afecte el layout de la grilla que lo contiene (projects__grid).

### - contact-form
Bloque que contiene la interfaz del formulario y la información de contacto. La lógica de validación está aislada e implementada desde cero con validaciones algorítmicas paso a paso, gestionando los modificadores de estado de error (form-group--error) de manera directa en el DOM.

## 5. Diseño (Figma)

El diseño visual y la experiencia de usuario fueron prototipados previamente. El diseño se encuentra en el siguiente enlace:

[Ver proyecto en Figma](https://www.figma.com/design/QG7T3aoa2EUJzReh0Jrmou/CV?node-id=0-1&t=A5LQg9W8XbjZzCVF-1)

## 6. Conversación con IA
Tú dijiste
del siguiente repositorio tengo la siguiente tarea:

ahora tenemos la siguiente tarea que quiero que vayamos implementando paso a paso, te paso la rubrica:

Observer APIs

Tu SPA ya navega sin recargas y tiene componentes encapsulados. Ahora necesitamos que la aplicación reaccione al entorno: que sepa cuándo un elemento aparece en pantalla, cuándo el DOM cambia internamente y cuándo un contenedor cambia de tamaño. No queremos soluciones con scroll listeners manuales ni polling.

Lo que se espera

Integrar en tu proyecto las siguientes APIs de observación del navegador:

IntersectionObserver

MutationObserver

ResizeObserver

Las tres deben estar implementadas de forma que resuelvan problemas reales dentro de tu aplicación, no como demo aislada. Si no le aporta nada a tu proyecto, no lo estás usando bien.

Algunas ideas

Lazy loading de imágenes o secciones, animaciones al entrar al viewport, tracking de lectura en artículos del blog, adaptar layouts cuando un panel cambia de tamaño, reaccionar cuando se insertan dinámicamente artículos o favoritos en el DOM. Puedes proponer las tuyas.

Documentación

En el README.md, agregar una sección donde se indique para cada Observer:

Dónde se implementó (qué componente o sección)

Qué problema resuelve

Por qué esta API es la solución adecuada en vez de alternativas más simples

Si la justificación es débil o genérica, no cuenta.

Consideraciones

No romper lo que ya funciona. La navegación SPA, Web Components, BEM y los patrones de diseño deben seguir intactos.

Se revisará el historial de commits. Se espera ver la refactorización como evolución, no como rewrite completo.



Quiero que empecemos por intersection Observer API, esto en la parte de blog, seria agregar mas cards de blogs de manera de demostrar que intersection Observer se esta aplicando correctamente asi como en la imagen donde mientras se vaya haciendo scroll se vayan mostrando las demas cards de blog, indicame teoricamente como implementar este Observer

Gemini dijo
¡Hola, Ariany! Qué gusto seguir trabajando en la evolución de tu portafolio. Ya logramos que tu aplicación tenga la arquitectura de una SPA profesional utilizando Web Components y patrones de diseño. Ahora vamos a darle esa reactividad e interactividad de alto nivel que exige la nueva rúbrica.

Empezar con la Intersection Observer API en la sección del Blog es la decisión perfecta. Como estudiante de ingeniería de software, sabes que el rendimiento y la optimización de recursos son clave en cualquier arquitectura frontend moderna, y esta API nos permite lograr exactamente eso sin sacrificar los FPS (Frames Per Second) de la página.

A continuación, te explico la teoría de cómo lo implementaremos y la justificación exacta que pondrás en tu README.md para que tu docente vea que comprendes a fondo el propósito de esta tecnología.

Teoría: ¿Cómo implementaremos Intersection Observer en el Blog?
Actualmente, cuando entras a la sección del Blog, todas las tarjetas (<blog-card>) se renderizan y aparecen de golpe. Si tuviéramos 10 o 20 artículos, cargar y pintar todo eso al mismo tiempo no solo saturaría la vista, sino que consumiría recursos del navegador procesando elementos que el usuario ni siquiera está viendo aún.

La estrategia (Fade-in / Lazy Reveal):

Vamos a agregar más artículos de prueba en tu data.json para que haya suficiente contenido que genere un scroll largo.

Modificaremos el CSS para que, por defecto, las tarjetas nazcan "invisibles" (con opacidad 0 y ligeramente desplazadas hacia abajo).

Crearemos una instancia de IntersectionObserver dentro de la clase BlogSection.

Le diremos al Observer que "vigile" cada una de las tarjetas generadas.

A medida que vayas haciendo scroll y una tarjeta entre en el viewport (el área visible de la pantalla), el Observer lo detectará instantáneamente y le agregará un modificador BEM (por ejemplo, .blog-card--visible). Este modificador disparará una transición CSS fluida que hará aparecer la tarjeta.

Justificación para tu README.md (Requisito de la rúbrica)
Para que cumplas con la exigencia de "Si la justificación es débil o genérica, no cuenta", esto es lo que argumentaremos:

Dónde se implementó: En el componente BlogSection.js (<blog-section>), específicamente vigilando los elementos hijos <blog-card>.

Qué problema resuelve: Resuelve el problema de la carga cognitiva y visual abrupta, implementando un patrón de Lazy Reveal (revelado diferido). Las tarjetas solo se animan y se hacen completamente visibles cuando el usuario hace scroll hasta ellas, mejorando la percepción de rendimiento de la SPA.

Por qué esta API es la solución adecuada en vez de alternativas más simples: La alternativa clásica (y obsoleta) sería usar un window.addEventListener('scroll', callback), lo cual dispara cientos de eventos por segundo, provocando cuellos de botella en el hilo principal de JavaScript (layout thrashing o jank) y degradando el rendimiento. IntersectionObserver delega el cálculo de la intersección de los elementos directamente al motor interno del navegador de forma asíncrona, siendo infinitamente más eficiente y limpio arquitectónicamente.

Plan de Acción (Paso a Paso)
Para no romper lo que ya funciona y seguir tu metodología BEM, haremos lo siguiente:

Paso 1 (Datos): Añadiremos 4 artículos extra a tu data.json para tener un total de 6 y poder hacer scroll.

Paso 2 (Estilos): Modificaremos blog.css para añadir el estado inicial oculto y la clase modificadora .blog-card--visible con su animación.

Paso 3 (Lógica): Refactorizaremos el método renderData() en BlogSection.js para instanciar el IntersectionObserver y observar las tarjetas justo después de inyectarlas en el DOM.

¿Estás de acuerdo con este enfoque teórico y el plan de ataque? Si es así, indícame para enviarte los códigos del Paso 1 y Paso 2 (el JSON actualizado y el CSS) e ir armando el efecto mágico paso a paso.

Tú dijiste
Y como implementariamos Mutation Observer y Resize Observer no logro encontrar un espacio para poder hacerlo correctamente

Gemini dijo
Es completamente normal que te cueste encontrarles un espacio. A diferencia del IntersectionObserver (que es muy visual y evidente), el MutationObserver y el ResizeObserver resuelven problemas arquitectónicos más sutiles. Si los forzamos, el docente se dará cuenta de que es una "demo aislada", como dice la rúbrica.

Como estás estudiando Ingeniería de Software, vamos a darle un enfoque arquitectónico a estas APIs. Pensaremos en ellas como herramientas para desacoplar componentes y manejar el ciclo de vida de tu SPA.

Aquí tienes dos propuestas de nivel profesional, reales y con justificaciones sólidas e irrefutables para tu README.md.

1. MutationObserver: El Gestor del Ciclo de Vida de la SPA
En tu arquitectura actual, el Router.js cambia el contenido del contenedor principal inyectando nuevos Web Components (ej. quita <home-section> y pone <blog-section>).

El problema real: En una aplicación tradicional, cuando cambias de página, el navegador automáticamente te lleva al inicio (arriba) de la nueva página. En una SPA, si el usuario hace scroll hacia abajo en la página de inicio y luego hace clic en "Blog", la vista del blog cargará pero el usuario seguirá abajo, a la mitad de la página. Esto es un error clásico de UX en las SPAs.

La solución: Usaremos un MutationObserver que vigile el contenedor principal (<main id="app">). Cada vez que detecte que sus "hijos" (childList) han cambiado (lo que significa que la vista cambió), automáticamente reseteará el scroll a la posición Y:0 y aplicará una sutil animación de fade-in a la nueva vista.

Lo que pondrás en tu README.md:

Dónde se implementó: En la capa global de la aplicación (posiblemente en index.js o un AppLayout), observando las mutaciones (childList) del contenedor principal de vistas (<main>).

Qué problema resuelve: Resuelve el problema de la retención de la posición del scroll al navegar en una Single Page Application (SPA), garantizando que cada nueva vista inyectada por el Router comience desde la parte superior (Y:0) y permitiendo enganchar animaciones de transición entre vistas.

Por qué esta API es la solución adecuada: La alternativa "simple" sería obligar al Router.js o a cada evento de clic de los enlaces a ejecutar window.scrollTo(0, 0). Sin embargo, esto acopla fuertemente la lógica de enrutamiento con los efectos secundarios de la interfaz de usuario (UI side-effects). Al usar MutationObserver, aplicamos el principio de Inversión de Control: el contenedor reacciona de forma autónoma a los cambios de su estado real en el DOM, sin importar si el cambio fue por un clic, por el botón de retroceso del navegador o por una redirección programática.

2. ResizeObserver: Responsive Design Basado en el Elemento (No en la Ventana)
Las Media Queries de CSS (@media (max-width: 768px)) son geniales, pero tienen un límite: evalúan el tamaño de la ventana del navegador (viewport), no el tamaño real que tiene tu componente disponible.

El problema real: Imagina la sección de Proyectos (<projects-section>). Supongamos que en el futuro tu portafolio tiene un menú lateral que se puede expandir o colapsar. Si el menú está expandido, el contenedor de tus proyectos tiene menos espacio real en píxeles. Una Media Query no detectaría esto si la ventana del navegador sigue estando maximizada, causando que las tarjetas de tus proyectos se aplasten.

La solución: Usaremos ResizeObserver directamente en el contenedor de las tarjetas dentro de ProjectsSection.js (o en CurriculumSection.js para la línea de tiempo). Este observer medirá los píxeles reales del componente. Si el contenedor se reduce a menos de cierto tamaño (independientemente del tamaño de la pantalla), cambiará dinámicamente sus clases CSS para pasar de una grilla de 3 columnas a 1 columna. Estamos construyendo el comportamiento de Container Queries mediante JavaScript.

Lo que pondrás en tu README.md:

Dónde se implementó: En el componente <projects-section> (o <curriculum-section>), observando el contenedor interno donde se renderizan los elementos de la cuadrícula/lista.

Qué problema resuelve: Implementa un diseño verdaderamente modular (adaptabilidad a nivel de componente). Permite que la distribución de las tarjetas de proyectos cambie su layout basándose en el espacio físico real disponible para ese contenedor específico, evitando desbordamientos o layouts comprimidos si otros elementos del DOM (como un panel lateral o barras de desplazamiento) consumen espacio en pantalla.

Por qué esta API es la solución adecuada: Las alternativas simples (@media queries o window.addEventListener('resize')) son insuficientes y anti-patrones para Web Components encapsulados. Un listener de la ventana evalúa el viewport global, no el tamaño del elemento, y se dispara excesivamente bloqueando el hilo principal. ResizeObserver ofrece dimensiones precisas del elemento (contentRect) de forma asíncrona y altamente optimizada, permitiendo que el componente sea 100% independiente de su entorno (puede ser colocado en cualquier lugar de la app y siempre se verá bien).

¿Qué opinas?
Con estos tres enfoques:

Intersection Observer -> Lazy Reveal de contenido en el Blog.

Mutation Observer -> Gestor de estado del DOM para resetear el scroll y animar transiciones de vistas en la SPA.

Resize Observer -> Adaptabilidad a nivel de contenedor (Container Queries) para tus componentes complejos.

Cumples con la rúbrica de forma excelente y con argumentos técnicos de alto nivel. Si te gusta el plan, ¡dime y empezamos a tirar el código del Paso 1: Intersection Observer que mencionamos en el mensaje anterior!

Tú dijiste
como implementarias Intersection Observer en el codigo? generame como se veria el codigo final en las secciones que se implemente esta API

Gemini dijo
¡Excelente! Vamos a llevar esa teoría a la práctica. Para implementar el patrón de Lazy Reveal con Intersection Observer, tocaremos tres archivos: el data.json (para tener contenido suficiente), tu archivo de estilos blog.css (para preparar la animación) y la lógica en BlogSection.js.

Aquí tienes el código paso a paso para que lo integres:

Paso 1: Actualizar data/data.json
Necesitamos más artículos para que se genere un scroll real en la página. He añadido 4 artículos adicionales con temáticas súper relevantes para un perfil de Ingeniería de Software.

Reemplaza tu arreglo "blogs" en el data.json por este:

JSON
  "blogs": [
    {
      "title": "El impacto de la IA en el desarrollo web",
      "description": "Analizamos cómo herramientas de visión artificial y machine learning están cambiando el flujo de trabajo de los programadores modernos.",
      "image": "img/blog-1.jpg",
      "badge": "Tecnología",
      "date": "15 de Abril de 2024",
      "readTime": "10 minutos"
    },
    {
      "title": "¿Por qué la Arquitectura de Software importa más que el código?",
      "description": "A veces nos obsesionamos con escribir líneas de código, pero un buen sistema nace antes de teclear. Reflexionamos sobre patrones de diseño limpios.",
      "image": "img/blog-2.jpg",
      "badge": "Arquitectura",
      "date": "15 de Abril de 2024",
      "readTime": "15 minutos"
    },
    {
      "title": "Despliegue ágil: Mi primera experiencia con Docker",
      "description": "Configurar entornos de desarrollo locales puede ser un dolor de cabeza. Aquí te explico cómo la contenerización simplifica la vida del desarrollador.",
      "image": "img/blog-1.jpg",
      "badge": "Tecnología",
      "date": "20 de Mayo de 2024",
      "readTime": "8 minutos"
    },
    {
      "title": "E-commerce desde cero: HTML, CSS, JS y Supabase",
      "description": "Un recorrido técnico sobre cómo construir una plataforma de comercio electrónico prescindiendo de frameworks pesados y apostando por el rendimiento nativo.",
      "image": "img/blog-2.jpg",
      "badge": "Tecnología",
      "date": "10 de Junio de 2024",
      "readTime": "12 minutos"
    },
    {
      "title": "De Dijkstra a A*: Algoritmos en la práctica",
      "description": "Un análisis profundo sobre diseño de algoritmos de búsqueda y cómo optimizar la toma de decisiones en el desarrollo de software.",
      "image": "img/blog-1.jpg",
      "badge": "Tecnología",
      "date": "05 de Agosto de 2024",
      "readTime": "14 minutos"
    },
    {
      "title": "UX/UI: La empatía como herramienta de diseño",
      "description": "Crear wireframes funcionales va más allá de lo estético. Analizamos la usabilidad de las aplicaciones desde la perspectiva del usuario final.",
      "image": "img/blog-2.jpg",
      "badge": "Arquitectura",
      "date": "12 de Septiembre de 2024",
      "readTime": "7 minutos"
    }
  ]
(Nota: Reutilicé img/blog-1.jpg y img/blog-2.jpg para no romper las rutas, pero puedes poner tus propias imágenes luego).

Paso 2: Actualizar blocks/blog/blog.css
Vamos a decirle al navegador que, por defecto, las tarjetas nazcan invisibles y un poco desplazadas hacia abajo. Luego, crearemos la clase modificadora --visible que el Observer activará.

Busca la clase .blog-card en tu CSS y actualízala junto con su hover, y añade la nueva clase .blog-card--visible. Debería quedar así:

CSS
/* Modificamos el estado inicial de la tarjeta */
.blog-card {
    display: flex;
    flex-direction: column;
    background-color: var(--card-bg-primary);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    height: 100%;
    
    /* NUEVO: Estado inicial oculto para el Intersection Observer */
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out; /* Transición fluida de entrada */
    will-change: opacity, transform; /* Optimización de rendimiento para el navegador */
}

/* NUEVO: Modificador BEM que se agregará por JS cuando entre en pantalla */
.blog-card--visible {
    opacity: 1;
    transform: translateY(0);
}

/* Ajustamos el hover para que funcione DESPUÉS de que la tarjeta sea visible */
.blog-card--visible:hover {
    transform: translateY(-8px);
    transition: transform 0.3s ease; /* Transición más rápida para el hover */
}
Paso 3: Implementar la API en blocks/blog/BlogSection.js
Aquí es donde ocurre la magia. Vamos a instanciar el IntersectionObserver justo después de que se renderizan las tarjetas en el método renderData().

Reemplaza tu método renderData() completo por este, y agrega el nuevo método setupIntersectionObserver() debajo de él:

JavaScript
    renderData() {
        const grid = this.querySelector('#dynamic-blog-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        const activeCategory = store.state.activeCategory;

        let filteredBlogs = this.blogsData;
        
        if (activeCategory === 'Favoritos') {
            filteredBlogs = this.blogsData.filter(blog => store.state.favorites.includes(blog.title));
        } else if (activeCategory !== 'Todos') {
            const normalizedActiveCategory = this.normalizeText(activeCategory);
            
            filteredBlogs = this.blogsData.filter(blog => {
                const badgeText = this.normalizeText(blog.badge);
                const categoryText = this.normalizeText(blog.category);
                
                return badgeText === normalizedActiveCategory || categoryText === normalizedActiveCategory;
            });
        }

        if (filteredBlogs.length === 0) {
            grid.innerHTML = '<p style="color: white; grid-column: 1 / -1; text-align: center;">No hay artículos en esta categoría.</p>';
            return;
        }

        filteredBlogs.forEach(blog => {
            const card = document.createElement('blog-card');
            card.setAttribute('title', blog.title);
            card.setAttribute('desc', blog.description);
            card.setAttribute('image', blog.image);
            card.setAttribute('badge', blog.badge);
            card.setAttribute('date', blog.date);
            card.setAttribute('readTime', blog.readTime);
            
            grid.appendChild(card);
        });

        // NUEVO: Una vez que las tarjetas están en el DOM, las observamos
        this.setupIntersectionObserver(grid);
    }

    // NUEVO: Lógica del Intersection Observer
    setupIntersectionObserver(grid) {
        // Obtenemos todos los web components <blog-card> inyectados
        const cards = grid.querySelectorAll('blog-card');
        
        // Configuramos las opciones del Observer
        const options = {
            root: null, // Usa el viewport del navegador
            rootMargin: '0px', // Sin márgenes extra
            threshold: 0.15 // Se dispara cuando el 15% de la tarjeta es visible
        };

        // Creamos la instancia
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si la tarjeta entra en el viewport...
                if (entry.isIntersecting) {
                    // Entramos al HTML interno del Web Component para buscar el <article>
                    const articleElement = entry.target.querySelector('.blog-card');
                    
                    if (articleElement) {
                        // Le aplicamos el modificador BEM
                        articleElement.classList.add('blog-card--visible');
                    }
                    
                    // Dejamos de observarla para que no se anime cada vez que subimos y bajamos (optimización)
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Le indicamos al observer que vigile cada tarjeta generada
        cards.forEach(card => observer.observe(card));
    }
¿Qué sucederá ahora?
Cuando entres a la sección del Blog, las primeras tarjetas que caben en la pantalla aparecerán con una animación suave de "fade in" hacia arriba. A medida que vayas haciendo scroll hacia abajo, las siguientes tarjetas irán apareciendo mágicamente conforme crucen el límite del 15% de tu pantalla (threshold: 0.15).

Guarda los cambios, recarga tu SPA y cuéntame si logras ver el efecto. Si todo funciona excelente, podemos pasar a implementar el MutationObserver en el enrutador.
