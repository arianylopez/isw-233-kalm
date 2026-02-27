document.addEventListener('DOMContentLoaded', function() {
    
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.navbar__link');

    window.addEventListener('scroll', function() {
        var current = '';

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        }

        for (var j = 0; j < navLinks.length; j++) {
            var link = navLinks[j];
            link.classList.remove('navbar__link--active');

            if (link.getAttribute('href').indexOf(current) !== -1) {
                link.classList.add('navbar__link--active');
            }
        }
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
                var small = formGroup.querySelector('.form-group__error-msg');
                
                if (small !== null) {
                    formGroup.classList.add('form-group--error');
                    small.innerText = message;
                }
                isValid = false;
            }

            function setSuccess(inputElement) {
                var formGroup = inputElement.parentElement;
                formGroup.classList.remove('form-group--error');
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