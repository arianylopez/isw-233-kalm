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

## 6. Conversación con Gemini

[Ver conversacion](https://gemini.google.com/share/b5f090298878) 
