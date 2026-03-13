import Router from './core/Router.js';

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