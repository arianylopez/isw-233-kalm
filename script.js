document.addEventListener('DOMContentLoaded', function() {
    
    var sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.sidebar__link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('sidebar__link--active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('sidebar__link--active');
            }
        });
    });

    var themeToggle = document.getElementById('theme-toggle');
    var body = document.body;

    if (themeToggle !== null) {
        themeToggle.addEventListener('change', function() {
            if (themeToggle.checked === true) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        });
    }

    var contactForm = document.getElementById('contactForm');
    
    if (contactForm !== null) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var nombre = document.getElementById('nombre');
            var correo = document.getElementById('correo');
            var mensaje = document.getElementById('mensaje');
            var isValid = true;

            function setError(inputElement, message) {
                var formGroup = inputElement.parentElement;
                const small = formGroup.querySelector('small');
                
                if (small !== null) {
                    formGroup.classList.add('contact-form__group--error');
                    small.innerText = message;
                }
                isValid = false;
            }

            function setSuccess(inputElement) {
                var formGroup = inputElement.parentElement;
                formGroup.classList.remove('contact-form__group--error');
            }
            
            if (nombre.value.trim() === '') {
                setError(nombre, 'El nombre es obligatorio');
            } else {
                setSuccess(nombre);
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (correo.value.trim() === '') {
                setError(correo, 'El correo es obligatorio');
            } else {
                if (emailRegex.test(correo.value.trim()) === false) {
                    setError(correo, 'Ingresa un correo válido');
                } else {
                    setSuccess(correo);
                }
            }

            if (mensaje.value.trim() === '') {
                setError(mensaje, 'Por favor escribe un mensaje');
            } else {
                setSuccess(mensaje);
            }

            if (isValid === true) {
                alert('¡Mensaje enviado con éxito! Gracias por contactarme.');
                contactForm.reset(); 
            }
        });
    }
});