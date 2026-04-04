import Router from './services/Router.js';
import './styles.css';

import './blocks/hero/hero.css';
import './blocks/hero/__wrapper/hero__wrapper.css';
import './blocks/hero/__content/hero__content.css';
import './blocks/hero/__greeting/hero__greeting.css';
import './blocks/hero/__title/hero__title.css';
import './blocks/hero/__description/hero__description.css';
import './blocks/hero/__actions/hero__actions.css';
import './blocks/hero/__visual/hero__visual.css';
import './blocks/hero/__image-wrapper/hero__image-wrapper.css';
import './blocks/hero/__image/hero__image.css';

import './blocks/btn/btn.css';
import './blocks/btn/_white/btn_white.css';
import './blocks/btn/_outline/btn_outline.css';
import './blocks/service-card/service-card.css';
import './blocks/service-card/__icon-box/service-card__icon-box.css';
import './blocks/service-card/__icon/service-card__icon.css';
import './blocks/service-card/__title/service-card__title.css';
import './blocks/service-card/__desc/service-card__desc.css';

import './blocks/about/about.css';
import './blocks/about/__container/about__container.css';
import './blocks/about/__content/about__content.css';
import './blocks/about/__subtitle/about__subtitle.css';
import './blocks/about/__title/about__title.css';
import './blocks/about/__line/about__line.css';
import './blocks/about/__description/about__description.css';
import './blocks/about/__skills/about__skills.css';
import './blocks/about/__skill-tag/about__skill-tag.css';
import './blocks/about/__visuals/about__visuals.css';
import './blocks/about/__avatar/about__avatar.css';
import './blocks/about/__avatar-img/about__avatar-img.css';
import './blocks/about/__services/about__services.css';

import './blocks/projects/projects.css';
import './blocks/projects/__container/projects__container.css';
import './blocks/projects/__header/projects__header.css';
import './blocks/projects/__subtitle/projects__subtitle.css';
import './blocks/projects/__title/projects__title.css';
import './blocks/projects/__line/projects__line.css';
import './blocks/projects/__grid/projects__grid.css';

import './blocks/project-card/project-card.css';
import './blocks/project-card/__image-box/project-card__image-box.css';
import './blocks/project-card/__img/project-card__img.css';
import './blocks/project-card/__github/project-card__github.css';
import './blocks/project-card/__content/project-card__content.css';
import './blocks/project-card/__title/project-card__title.css';
import './blocks/project-card/__desc/project-card__desc.css';
import './blocks/project-card/__tags/project-card__tags.css';
import './blocks/project-card/__tag/project-card__tag.css';

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