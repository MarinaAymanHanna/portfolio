/**
 * Marina Hanna - Personal Portfolio (DevFolio Base)
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Typed.js Initialization (Strictly: Developer, Freelancer)
    // --------------------------------------------------------------------------
    const typedElement = document.querySelector('#element');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#element', {
            strings: ['Developer', 'Freelancer'],
            typeSpeed: 90,
            backSpeed: 50,
            backDelay: 1800,
            startDelay: 400,
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // --------------------------------------------------------------------------
    // Initialize Bootstrap 5 ScrollSpy
    // --------------------------------------------------------------------------
    if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#navbar-example',
            offset: 100
        });
    }

    // --------------------------------------------------------------------------
    // 2. Active Navigation Scroll Spy & Smart Navbar
    // --------------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('header#home, section[id]');
    const navCollapse = document.querySelector('.navbar-collapse');
    let lastScrollTop = 0;
    const scrollDelta = 5;

    const updateActiveNav = () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        let currentSectionId = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar appearance at top vs scrolled
        if (currentScroll > 60) {
            navbar.classList.add('navbar-reduce');
        } else {
            navbar.classList.remove('navbar-reduce');
        }

        // Hide on scroll down, show on scroll up
        if (Math.abs(lastScrollTop - currentScroll) > scrollDelta) {
            if (currentScroll > lastScrollTop && currentScroll > 150) {
                // Scrolling down
                navbar.classList.add('navbar-hidden');
                navbar.classList.remove('navbar-visible');
            } else {
                // Scrolling up or at top
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('navbar-visible');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }

        // Scroll Spy active update
        updateActiveNav();

        // Scroll to top button visibility
        if (scrollTopBtn) {
            if (currentScroll > 350) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    }, { passive: true });

    // Initial update on page load
    window.addEventListener('load', updateActiveNav);
    updateActiveNav();

    // Click handler for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (navCollapse && navCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // --------------------------------------------------------------------------
    // 3. Scroll to Top Floating Button
    // --------------------------------------------------------------------------
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --------------------------------------------------------------------------
    // 4. Contact Form Feedback
    // --------------------------------------------------------------------------
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            const name = contactForm.querySelector('input[name="name"]')?.value || '';
            const subject = contactForm.querySelector('input[name="subject"]')?.value || 'Portfolio Contact';
            const message = contactForm.querySelector('textarea[name="message"]')?.value || '';

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';

            setTimeout(() => {
                // Open user's default email client addressed to Marina's email
                const mailtoUrl = `mailto:marina.ayman.hanna@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Marina,\n\nName: ${name}\n\n${message}`)}`;
                window.location.href = mailtoUrl;

                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Ready!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                }, 3500);
            }, 800);
        });
    }
});
