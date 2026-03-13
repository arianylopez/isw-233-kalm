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

    // Función para renderizar los artículos de los proyectos
    const renderProjects = (projects) => {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = ''; 

        projects.forEach(project => {
            const tagsHtml = project.tags.map(tag => `<span class="project-card__tag">${tag}</span>`).join('');

            const cardHTML = `
                <article class="project-card">
                    <div class="project-card__image-box">
                        <img src="${project.image}" alt="${project.title}" class="project-card__img">
                        <a href="${project.githubLink}" target="_blank" class="project-card__github" title="Ver en GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                    <div class="project-card__content">
                        <h3 class="project-card__title">${project.title}</h3>
                        <p class="project-card__desc">${project.description}</p>
                        <div class="project-card__tags">
                            ${tagsHtml}
                        </div>
                    </div>
                </article>
            `;
            
            projectsGrid.innerHTML += cardHTML;
        });
    };

    // Función para renderizar los artículos del blog
    const renderBlogs = (blogs) => {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid) return;

        blogGrid.innerHTML = '';

        blogs.forEach(blog => {
            const cardHTML = `
                <article class="blog-card">
                    <div class="blog-card__image-box">
                        <img src="${blog.image}" alt="${blog.title}" class="blog-card__img">
                        <span class="blog-card__badge">${blog.badge}</span>
                    </div>
                    <div class="blog-card__content">
                        <div class="blog-card__meta">
                            <span><i class="far fa-calendar-alt"></i> ${blog.date}</span>
                            <span><i class="far fa-clock"></i> ${blog.readTime}</span>
                        </div>
                        <h3 class="blog-card__title">${blog.title}</h3>
                        <p class="blog-card__desc">${blog.description}</p>
                    </div>
                </article>
            `;
            
            blogGrid.innerHTML += cardHTML;
        });
    };

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.json();
        })
        .then(data => {
            renderProjects(data.projects);
            renderBlogs(data.blogs);
        })
        .catch(error => {
            console.error('Hubo un problema con la petición Fetch:', error);
            document.getElementById('projects-grid').innerHTML = '<p>Error al cargar los proyectos.</p>';
            document.getElementById('blog-grid').innerHTML = '<p>Error al cargar los artículos.</p>';
        });
});