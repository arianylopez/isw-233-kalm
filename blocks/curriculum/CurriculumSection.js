const template = document.createElement('template');
template.innerHTML = `
    <section class="resume">
        <div class="resume__container">
            
            <div class="resume__column resume__column--left">
                <div class="profile-card">
                    <div class="profile-card__avatar">
                        <img src="img/cv.jpg" alt="Perfil" class="profile-card__img">
                    </div>
                    <h3 class="profile-card__name">ARIANY LOPEZ</h3>
                    <span class="profile-card__role">Estudiante de Ingeniería de Software</span>
                    <p class="profile-card__desc">
                        Estudiante de Ingeniería de Software en la Universidad Católica Boliviana
                        (UCB), apasionada por la tecnología y su potencial transformador. Me
                        considero una persona entusiasta, proactiva y con ganas de aprendizaje
                        continuo. Disfruto del trabajo colaborativo y poseo una alta capacidad de
                        adaptación ante nuevos entornos y desafíos. Mi motivación principal es
                        aportar soluciones innovadoras y generar un impacto positivo, integrando
                        mi formación académica con el compromiso social y el valor del trabajo en
                        equipo adquirido en experiencias de voluntariado.
                    </p>
                </div>
            </div>

            <div class="resume__column resume__column--right">
                
                <div class="resume-card">
                    <div class="resume-card__header">
                        <div class="resume-card__icon-box"><i class="fas fa-graduation-cap"></i></div>
                        <h3 class="resume-card__title">Educación</h3>
                    </div>
                    
                    <div class="timeline">
                        <div class="timeline__item">
                            <span class="timeline__dot"></span>
                            <div class="timeline__content">
                                <div class="timeline__header">
                                    <h4 class="timeline__title">Ingeniería de Software</h4>
                                    <span class="timeline__date">2023 - Presente</span>
                                </div>
                                <p class="timeline__institution">Universidad Católica Boliviana</p>
                            </div>
                        </div>

                        <div class="timeline__item">
                            <span class="timeline__dot"></span>
                            <div class="timeline__content">
                                <div class="timeline__header">
                                    <h4 class="timeline__title">Bachiller en Humanidades</h4>
                                    <span class="timeline__date">2012 - 2023</span>
                                </div>
                                <p class="timeline__institution">Colegio Fe y Alegria</p>
                            </div>
                        </div>

                        <div class="timeline__item">
                            <span class="timeline__dot"></span>
                            <div class="timeline__content">
                                <div class="timeline__header">
                                    <h4 class="timeline__title">Certificado de Suficiencia en Inglés</h4>
                                    <span class="timeline__date">Julio 2020 - Enero 2024</span>
                                </div>
                                <p class="timeline__institution">Centro Boliviano Americano</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="resume-card">
                    <div class="resume-card__header">
                        <div class="resume-card__icon-box"><i class="fas fa-code"></i></div>
                        <h3 class="resume-card__title">Habilidades</h3>
                    </div>

                    <div class="skills">
                        <div class="skills__category">
                            <h5 class="skills__title">Frontend</h5>
                            <div class="skills__tags">
                                <span class="skills__tag">HTML</span><span class="skills__tag">CSS</span><span class="skills__tag">JavaScript</span><span class="skills__tag">React</span><span class="skills__tag">Figma</span><span class="skills__tag">Angular</span>
                            </div>
                        </div>

                        <div class="skills__category">
                            <h5 class="skills__title">Backend</h5>
                            <div class="skills__tags">
                                <span class="skills__tag">Python</span><span class="skills__tag">C#</span><span class="skills__tag">SQL</span><span class="skills__tag">Java</span>
                            </div>
                        </div>

                        <div class="skills__category">
                            <h5 class="skills__title">Herramientas</h5>
                            <div class="skills__tags">
                                <span class="skills__tag">Git</span><span class="skills__tag">GitHub</span><span class="skills__tag">VS Code</span><span class="skills__tag">Trello</span><span class="skills__tag">Miro</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="resume-card">
                    <div class="resume-card__header">
                        <div class="resume-card__icon-box"><i class="fas fa-gamepad"></i></div>
                        <h3 class="resume-card__title">Hobbies</h3>
                    </div>
                    
                    <div class="hobbies">
                        <div class="hobbies__item">
                            <div class="hobbies__icon-box"><i class="fas fa-puzzle-piece"></i></div>
                            <span class="hobbies__name">Puzzles</span>
                        </div>
                        <div class="hobbies__item">
                            <div class="hobbies__icon-box"><i class="fas fa-music"></i></div>
                            <span class="hobbies__name">Música</span>
                        </div>
                        <div class="hobbies__item">
                            <div class="hobbies__icon-box"><i class="fas fa-futbol"></i></div>
                            <span class="hobbies__name">Deporte</span>
                        </div>
                        <div class="hobbies__item">
                            <div class="hobbies__icon-box"><i class="fas fa-camera"></i></div>
                            <span class="hobbies__name">Fotografía</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
`;

export class CurriculumSection extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('curriculum-section', CurriculumSection);