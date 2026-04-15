import Router from './services/Router';

import './styles.css'; 

import './blocks/home/HomeSection';
import './blocks/about/AboutSection';
import './blocks/resume/CurriculumSection';
import './blocks/projects/ProjectsSection';
import './blocks/blog/BlogSection';
import './blocks/contact/ContactSection';
import './blocks/footer/FooterSection';

document.addEventListener('DOMContentLoaded', () => {
    Router.init();

    const themeToggle = document.getElementById('theme-toggle') as HTMLInputElement;
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