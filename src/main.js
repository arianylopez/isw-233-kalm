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

import './blocks/contact/contact.css';
import './blocks/contact/__container/contact__container.css';
import './blocks/contact/__header/contact__header.css';
import './blocks/contact/__subtitle/contact__subtitle.css';
import './blocks/contact/__title/contact__title.css';
import './blocks/contact/__line/contact__line.css';
import './blocks/contact/__banner/contact__banner.css';
import './blocks/contact/__avatar/contact__avatar.css';
import './blocks/contact/__avatar-img/contact__avatar-img.css';
import './blocks/contact/__wrapper/contact__wrapper.css';

import './blocks/contact-info/contact-info.css';
import './blocks/contact-info/__title/contact-info__title.css';
import './blocks/contact-info/__items/contact-info__items.css';
import './blocks/contact-info/__item/contact-info__item.css';
import './blocks/contact-info/__icon-box/contact-info__icon-box.css';
import './blocks/contact-info/__details/contact-info__details.css';
import './blocks/contact-info/__label/contact-info__label.css';
import './blocks/contact-info/__value/contact-info__value.css';
import './blocks/contact-info/__socials-title/contact-info__socials-title.css';
import './blocks/contact-info/__socials-icons/contact-info__socials-icons.css';
import './blocks/contact-info/__social-link/contact-info__social-link.css';

import './blocks/contact-form/contact-form.css';
import './blocks/contact-form/__title/contact-form__title.css';
import './blocks/contact-form/__group/contact-form__group.css';
import './blocks/contact-form/__label/contact-form__label.css';
import './blocks/contact-form/__input/contact-form__input.css';
import './blocks/contact-form/__error/contact-form__error.css';
import './blocks/contact-form/__submit/contact-form__submit.css';

import './blocks/resume/resume.css';
import './blocks/resume/__container/resume__container.css';
import './blocks/resume/__column/resume__column.css';

import './blocks/profile-card/profile-card.css';
import './blocks/profile-card/__avatar/profile-card__avatar.css';
import './blocks/profile-card/__img/profile-card__img.css';
import './blocks/profile-card/__name/profile-card__name.css';
import './blocks/profile-card/__role/profile-card__role.css';
import './blocks/profile-card/__desc/profile-card__desc.css';

import './blocks/resume-card/resume-card.css';
import './blocks/resume-card/__header/resume-card__header.css';
import './blocks/resume-card/__icon-box/resume-card__icon-box.css';
import './blocks/resume-card/__title/resume-card__title.css';

import './blocks/timeline/timeline.css';
import './blocks/timeline/__item/timeline__item.css';
import './blocks/timeline/__dot/timeline__dot.css';
import './blocks/timeline/__header/timeline__header.css';
import './blocks/timeline/__title/timeline__title.css';
import './blocks/timeline/__date/timeline__date.css';
import './blocks/timeline/__institution/timeline__institution.css';

import './blocks/skills/skills.css';
import './blocks/skills/__title/skills__title.css';
import './blocks/skills/__tags/skills__tags.css';
import './blocks/skills/__tag/skills__tag.css';

import './blocks/hobbies/hobbies.css';
import './blocks/hobbies/__item/hobbies__item.css';
import './blocks/hobbies/__icon-box/hobbies__icon-box.css';
import './blocks/hobbies/__name/hobbies__name.css';

import './blocks/footer/footer.css';
import './blocks/footer/__container/footer__container.css';
import './blocks/footer/__top/footer__top.css';
import './blocks/footer/__col/footer__col.css';
import './blocks/footer/__title/footer__title.css';
import './blocks/footer/__desc/footer__desc.css';
import './blocks/footer/__links/footer__links.css';
import './blocks/footer/__link/footer__link.css';
import './blocks/footer/__socials/footer__socials.css';
import './blocks/footer/__social-link/footer__social-link.css';
import './blocks/footer/__bottom/footer__bottom.css';
import './blocks/footer/__copy/footer__copy.css';

import './blocks/home/HomeSection.js';
import './blocks/about/AboutSection.js';
import './blocks/resume/CurriculumSection.js';
import './blocks/projects/ProjectsSection.js';
import './blocks/blog/BlogSection.js';
import './blocks/contact/ContactSection.js';
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