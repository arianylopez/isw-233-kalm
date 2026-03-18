const template = document.createElement('template');
template.innerHTML = `
    <section class="hero">
        <div class="hero__wrapper">
            <div class="hero__content">
                <span class="hero__greeting">ESTUDIANTE DE INGENIERÍA DE SOFTWARE</span>
                <h1 class="hero__title">Hola, Soy <br> Ariany Lopez !</h1>
                <div class="hero__description">
                    <p>Construyendo el futuro línea por línea.</p>
                    <p>Apasionada por el diseño de sistemas, la arquitectura de software y la innovación tecnológica.</p>
                    <p>Siempre aprendiendo, siempre codificando.</p>
                </div>
                <div class="hero__actions">
                    <a href="/proyectos" class="btn btn--white" data-link>VER PROYECTOS</a>
                    <a href="/contacto" class="btn btn--outline" data-link>CONTÁCTAME</a>
                </div>
            </div>
            <div class="hero__visual">
                <div class="hero__image-wrapper">
                    <img src="img/avatar.png" alt="Ariany Lopez Avatar" class="hero__image">
                </div>
            </div>
        </div>
    </section>
`;

export class HomeSection extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('home-section', HomeSection);