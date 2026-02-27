document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm !== null) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const mensaje = document.getElementById('mensaje');
            
            let isValid = true;

            const setError = (inputElement, message) => {
                const formGroup = inputElement.parentElement;
                const small = formGroup.querySelector('.form-group__error-msg');
                
                if (small !== null) {
                    formGroup.classList.add('form-group--error');
                    small.innerText = message;
                }
                isValid = false;
            };

            const setSuccess = (inputElement) => {
                const formGroup = inputElement.parentElement;
                formGroup.classList.remove('form-group--error');
            };
            
            if (nombre.value.trim() === '') {
                setError(nombre, 'El nombre es obligatorio');
            } else {
                setSuccess(nombre);
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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