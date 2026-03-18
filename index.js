import Router from './services/Router.js';

import './blocks/home/HomeSection.js';
import './blocks/about/AboutSection.js';
import './blocks/curriculum/CurriculumSection.js';
import './blocks/projects/ProjectsSection.js';
import './blocks/blog/BlogSection.js';
import './blocks/contact-me/ContactSection.js';
import './blocks/footer/FooterSection.js';

document.addEventListener('DOMContentLoaded', () => {
    Router.init();

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            if(themeToggle.checked) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        });
    } 
});