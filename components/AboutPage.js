export default class AboutPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '';

        const template = document.createElement('template');
        template.innerHTML = `
            <section class="about">
                <div class="about__container">
                    <div class="about__content">
                        <span class="about__subtitle">SOBRE MÍ</span>
                        <h2 class="about__title">Conóceme</h2>
                        <div class="about__line"></div>
                        <div class="about__description">
                            <h3>Soy estudiante de la Universidad Católica Boliviana con un fuerte enfoque en el desarrollo frontend e interfaces</h3>
                            <p>Soy una apasionada por la tecnología y el diseño. Me encanta resolver problemas complejos a través de código limpio y eficiente. Siempre estoy buscando aprender nuevas herramientas para mejorar mis habilidades.</p>
                            <p>Mi objetivo es crear software escalable y bien estructurado.</p>
                        </div>
                        <div class="about__skills">
                            <span class="about__skill-tag">Python</span>
                            <span class="about__skill-tag">Diseño UI/UX</span>
                            <span class="about__skill-tag">C++</span>
                            <span class="about__skill-tag">C#</span>
                        </div>
                    </div>
                    <div class="about__visuals">
                        <div class="about__avatar">
                            <img src="img/avatar-face.png" alt="Ariany Face" class="about__avatar-img">
                        </div>
                        <div class="about__services">
                            <div class="service-card">
                                <div class="service-card__icon-box"><i class="fas fa-code service-card__icon"></i></div>
                                <h4 class="service-card__title">Desarrollo</h4>
                                <p class="service-card__desc">Creación de software a medida.</p>
                            </div>
                            <div class="service-card">
                                <div class="service-card__icon-box"><i class="fas fa-palette service-card__icon"></i></div>
                                <h4 class="service-card__title">Diseño</h4>
                                <p class="service-card__desc">Interfaces modernas y limpias.</p>
                            </div>
                            <div class="service-card">
                                <div class="service-card__icon-box"><i class="fas fa-bolt service-card__icon"></i></div>
                                <h4 class="service-card__title">Eficiencia</h4>
                                <p class="service-card__desc">Optimización de procesos.</p>
                            </div>
                            <div class="service-card">
                                <div class="service-card__icon-box"><i class="fas fa-user-friends service-card__icon"></i></div>
                                <h4 class="service-card__title">Equipo</h4>
                                <p class="service-card__desc">Colaboración proactiva.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('about-page', AboutPage);