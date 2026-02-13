document.addEventListener('DOMContentLoaded', () => {
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li a');

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
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('change', () => {
        if(themeToggle.checked) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    });

    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const mensaje = document.getElementById('mensaje');
            
            let isValid = true;

            const setError = (input, message) => {
                const formGroup = input.parentElement;
                const small = formGroup.querySelector('small');
                if(!small) return; 
                
                formGroup.classList.add('error');
                small.innerText = message;
                isValid = false;
            };

            const setSuccess = (input) => {
                const formGroup = input.parentElement;
                formGroup.classList.remove('error');
            };
            
            if(nombre.value.trim() === '') {
                setError(nombre, 'El nombre es obligatorio');
            } else {
                setSuccess(nombre);
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(correo.value.trim() === '') {
                setError(correo, 'El correo es obligatorio');
            } else if(!emailRegex.test(correo.value.trim())) {
                setError(correo, 'Ingresa un correo válido');
            } else {
                setSuccess(correo);
            }

            if(mensaje.value.trim() === '') {
                setError(mensaje, 'Por favor escribe un mensaje');
            } else {
                setSuccess(mensaje);
            }

            if(isValid) {
                alert('¡Mensaje enviado con éxito! Gracias por contactarme.');
                contactForm.reset(); 
            }
        });
    }
});