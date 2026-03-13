import Router from './core/Router.js';

import './components/HomePage.js';
import './components/AboutPage.js';
import './components/ContactPage.js';
import './components/ResumePage.js';
import './components/ProjectsPage.js';
import './components/BlogCard.js';
import './components/BlogPage.js';
import './components/Footer.js';

document.addEventListener('DOMContentLoaded', () => {
    new Router();

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