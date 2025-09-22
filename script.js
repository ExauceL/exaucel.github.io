document.addEventListener('DOMContentLoaded', function () {
    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        header.classList.toggle('sticky', window.scrollY > 50);
    });

    // Mobile menu toggle
    const menuBtn = document.createElement('div');
    menuBtn.classList.add('menu-btn');
    menuBtn.innerHTML = '<i class="bx bx-menu"></i>';
    document.querySelector('.header').appendChild(menuBtn);

    menuBtn.addEventListener('click', function () {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        const navbar = document.querySelector('.navbar');
        const menuBtn = document.querySelector('.menu-btn');
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });

    // Animate home page elements if on home page
    if (document.querySelector('.home-content')) {
        const animatedElements = document.querySelectorAll('.home-content h1, .home-content h3, .home-content p, .btn-box, .home-sci');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // 🌙 Dark/Light mode toggle
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙 Toggle Dark Mode';
    themeToggle.classList.add('theme-toggle');
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // 🎭 Show/Hide About Section (only if on About page)
    if (document.querySelector('.about')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = "Show/Hide About";
        toggleBtn.classList.add('about-toggle');
        document.querySelector('.about').appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            const aboutText = document.querySelector('.about p');
            aboutText.style.display = (aboutText.style.display === "none") ? "block" : "none";
        });
    }

    // 📧 Extra Validation for Contact Page (if exists)
    if (document.getElementById('contactForm')) {
        const form = document.getElementById('contactForm');
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');

        form.addEventListener('submit', function (e) {
            if (!emailInput.value.includes('@')) {
                e.preventDefault();
                emailError.textContent = 'Please enter a valid email.';
            } else {
                emailError.textContent = '';
            }
        });
    }
});
