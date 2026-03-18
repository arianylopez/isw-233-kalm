const template = document.createElement('template');
template.innerHTML = `
    <section class="contact">
        <div class="contact__container">
            
            <div class="contact__header">
                <div class="contact__titles">
                    <span class="contact__subtitle">CONTACTAME</span>
                    <h2 class="contact__title">Trabajemos Juntos</h2>
                    <div class="contact__line"></div>
                </div>
                
                <div class="contact__banner">
                    <p>¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y colaborar.</p>
                </div>

                <div class="contact__avatar">
                    <img src="img/avatar-contact.png" alt="Trabajemos juntos" class="contact__avatar-img">
                </div>
            </div>

            <div class="contact__wrapper">
                
                <div class="contact-info">
                    <h3 class="contact-info__title">Información de Contacto</h3>
                    
                    <div class="contact-info__items">
                        <div class="contact-info__item">
                            <div class="contact-info__icon-box">
                                <i class="far fa-envelope"></i>
                            </div>
                            <div class="contact-info__details">
                                <span class="contact-info__label">Correo</span>
                                <span class="contact-info__value">arianylopez341@gmail.com</span>
                            </div>
                        </div>

                        <div class="contact-info__item">
                            <div class="contact-info__icon-box">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <div class="contact-info__details">
                                <span class="contact-info__label">Teléfono</span>
                                <span class="contact-info__value">+591 77205461</span>
                            </div>
                        </div>

                        <div class="contact-info__item">
                            <div class="contact-info__icon-box">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-info__details">
                                <span class="contact-info__label">Ubicación</span>
                                <span class="contact-info__value">Santa Cruz, Bolivia</span>
                            </div>
                        </div>
                    </div>

                    <div class="contact-info__socials">
                        <h4 class="contact-info__socials-title">Sígueme en redes</h4>
                        <div class="contact-info__socials-icons">
                            <a href="https://github.com/arianylopez" class="contact-info__social-link" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/ariany-lopez/" class="contact-info__social-link" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            <a href="mailto:arianylopez341@gmail.com" class="contact-info__social-link"><i class="far fa-envelope"></i></a>
                        </div>
                    </div>
                </div>

                <div class="contact-form">
                    <h3 class="contact-form__title">Envíame un mensaje</h3>
                    
                    <form id="contactForm" class="contact-form__wrapper">
                        <div class="contact-form__group">
                            <label for="nombre" class="contact-form__label">NOMBRE *</label>
                            <input type="text" id="nombre" class="contact-form__input" placeholder="Tu nombre completo">
                            <small class="contact-form__error">El nombre es obligatorio</small>
                        </div>

                        <div class="contact-form__group">
                            <label for="correo" class="contact-form__label">CORREO *</label>
                            <input type="email" id="correo" class="contact-form__input" placeholder="ejemplo@correo.com">
                            <small class="contact-form__error">Ingresa un correo válido</small>
                        </div>

                        <div class="contact-form__group">
                            <label for="telefono" class="contact-form__label">NUMERO DE CONTACTO</label>
                            <input type="tel" id="telefono" class="contact-form__input" placeholder="+591 ...">
                        </div>

                        <div class="contact-form__group">
                            <label for="interes" class="contact-form__label">¿EN QUE ESTAS INTERESADO?</label>
                            <input type="text" id="interes" class="contact-form__input" placeholder="Desarrollo Web, Diseño, etc.">
                        </div>

                        <div class="contact-form__group">
                            <label for="mensaje" class="contact-form__label">MENSAJE *</label>
                            <textarea id="mensaje" rows="5" class="contact-form__input" placeholder="Cuéntame sobre tu proyecto..."></textarea>
                            <small class="contact-form__error">El mensaje no puede estar vacío</small>
                        </div>

                        <button type="submit" class="contact-form__submit">
                            ENVIAR <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </section>
`;

export class ContactSection extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('contact-section', ContactSection);