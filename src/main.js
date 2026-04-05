import Router from './services/Router.js';
import './styles.css';
import './blocks/global/global.css';

import './blocks/sidebar/sidebar.css';
import './blocks/hero/hero.css';
import './blocks/about/about.css';
import './blocks/resume/resume.css';
import './blocks/projects/projects.css';
import './blocks/contact/contact.css';
import './blocks/blog/blog.css';
import './blocks/footer/footer.css';

document.addEventListener('DOMContentLoaded', () => {
    Router.init();

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if(themeToggle.checked) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        });
    }

    const themeObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isDark = body.classList.contains('dark-mode');
                localStorage.setItem('app-theme', isDark ? 'dark' : 'light');
            }
        }
    });

    themeObserver.observe(body, {
        attributes: true,
        attributeFilter: ['class'] 
    });
});