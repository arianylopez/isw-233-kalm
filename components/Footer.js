export default class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <div class="footer__container">
                    
                    <div class="footer__top">
                        <div class="footer__col">
                            <h3 class="footer__title">Ariany Lopez</h3>
                            <p class="footer__desc">Estudiante de Ingeniería de Software en la Universidad Católica Boliviana, apasionada por la tecnología y el diseño. Me encanta resolver problemas complejos a través de código limpio y eficiente.</p>
                        </div>

                        <div class="footer__col">
                            <h3 class="footer__title">Enlaces Rápidos</h3>
                            <ul class="footer__links">
                                <li><a href="/about" class="footer__link" data-link>Sobre mí</a></li>
                                <li><a href="/proyectos" class="footer__link" data-link>Proyectos</a></li>
                                <li><a href="/blog" class="footer__link" data-link>Blog</a></li>
                                <li><a href="/contacto" class="footer__link" data-link>Contacto</a></li>
                            </ul>
                        </div>

                        <div class="footer__col">
                            <h3 class="footer__title">Sígueme</h3>
                            <div class="footer__socials">
                                <a href="https://github.com/arianylopez" target="_blank" aria-label="GitHub" class="footer__social-link">
                                    <i class="fab fa-github-alt"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/ariany-lopez/" target="_blank" aria-label="LinkedIn" class="footer__social-link">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a href="mailto:arianylopez341@gmail.com" aria-label="Email" class="footer__social-link">
                                    <i class="far fa-envelope"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div> <div class="footer__bottom">
                    <p class="footer__copy">&copy; 2026 Ariany Lopez</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);