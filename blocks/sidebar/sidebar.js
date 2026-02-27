document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.navbar__link');

    window.addEventListener('scroll', function() {
        var current = '';

        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionTop = section.offsetTop;
            var sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        }

        for (var j = 0; j < navLinks.length; j++) {
            var link = navLinks[j];
            link.classList.remove('navbar__link--active');

            if (link.getAttribute('href').indexOf(current) !== -1) {
                link.classList.add('navbar__link--active');
            }
        }
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
});