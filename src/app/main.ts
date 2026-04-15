import Router from '../services/Router';

import './styles.css'; 

import '../pages/home/HomeSection';
import '../widgets/about/AboutSection';
import '../widgets/resume/CurriculumSection';
import '../widgets/projects/ProjectsSection';
import '../widgets/blog/BlogSection';
import '../widgets/contact/ContactSection';
import '../widgets/footer/FooterSection';

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