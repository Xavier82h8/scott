(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarContent = document.getElementById('navbarContent');
    const navbarMenu = document.getElementById('navbarMenu');
    let overlay;

    // Accesibilidad básica y ARIA
    if (navbarToggle && navbarContent) {
        if (!navbarToggle.getAttribute('aria-controls')) {
            navbarToggle.setAttribute('aria-controls', 'navbarContent');
        }
        navbarContent.setAttribute('aria-hidden', 'true');
    }

    // Toggle menú móvil + overlay + focus trap
    if (navbarToggle && navbarContent) {
        const ensureOverlay = () => {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'navbar-overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', closeMenu);
            }
        };

        navbarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = this.classList.toggle('active');
            navbarContent.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            this.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            navbarContent.setAttribute('aria-hidden', isActive ? 'false' : 'true');

            ensureOverlay();
            if (overlay) overlay.classList.toggle('active', isActive);

            if (isActive) {
                focusFirstLink();
                trapFocus(navbarContent);
            } else {
                releaseFocusTrap();
                this.focus();
            }
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && navbarContent.classList.contains('active')) {
                closeMenu();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navbarContent.classList.contains('active')) {
                closeMenu();
            }
        });

        // Dropdown en móvil por click
        const dropdownItems = document.querySelectorAll('.has-dropdown > .navbar-link');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('open');
                }
            });
        });

        // Cerrar menú al navegar en móvil
        if (navbarMenu) {
            const navbarLinks = navbarMenu.querySelectorAll('.navbar-link, .navbar-dropdown-item');
            navbarLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768 && !this.parentElement.classList.contains('has-dropdown')) {
                        closeMenu();
                    }
                });
            });
        }
    }

    function closeMenu() {
        if (!navbarToggle || !navbarContent) return;
        navbarToggle.classList.remove('active');
        navbarContent.classList.remove('active');
        document.body.classList.remove('menu-open');
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarContent.setAttribute('aria-hidden', 'true');
        if (overlay) overlay.classList.remove('active');
        releaseFocusTrap();

        // Cerrar dropdowns
        document.querySelectorAll('.has-dropdown.open').forEach(item => {
            item.classList.remove('open');
        });
        // ... existing code ...
    }

    function focusFirstLink() {
        const first = navbarContent.querySelector('.navbar-link, .navbar-dropdown-item, .navbar-btn');
        if (first) first.focus();
    }

    // Focus trap accesible
    let trapHandler = null;
    function trapFocus(container) {
        releaseFocusTrap();
        trapHandler = function(e) {
            if (e.key !== 'Tab') return;
            const focusables = container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled'));
            if (list.length === 0) return;
            const first = list[0];
            const last = list[list.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', trapHandler);
    }
    function releaseFocusTrap() {
        if (trapHandler) {
            document.removeEventListener('keydown', trapHandler);
            trapHandler = null;
        }
    }

    // Mantener activo el link según ruta
    function setActivePage() {
        const currentPath = window.location.pathname;
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (!href) return;
            if (href === currentPath ||
                (currentPath === '/' && href === '/') ||
                (currentPath !== '/' && href !== '/' && currentPath.startsWith(href))) {
                link.classList.add('active');
            }
        });
    }

    // Scroll efecto
    let scrollTimeout;
    function handleScroll() {
        if (!navbar) return;
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
        // ... existing code ...
    }
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    });

    // Inicialización
    document.addEventListener('DOMContentLoaded', function() {
        // Detección robusta del entorno de plantillas locales
        const path = location.pathname;
        const isTemplatesEnv = /\/templates\//.test(path);
        const m = path.match(/^(.*\/templates)\//);
        const templatesRoot = m ? m[1] : '/templates';

        // Remapeo sólo en entorno de plantillas locales (no producción)
        if (isTemplatesEnv) {
            const map = {
                '/':        `${templatesRoot}/index.html`,
                '/pricing': `${templatesRoot}/pricing.html`,
                '/agents':  `${templatesRoot}/agents.html`,
                '/contact': `${templatesRoot}/contact.html`
            };
            document.querySelectorAll('a.navbar-link, .navbar-dropdown a, .navbar-logo').forEach(a => {
                const href = a.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('http')) return;
                if (map[href]) a.setAttribute('href', map[href]);
            });
        }

        // Estado activo del navbar (plantillas)
        const current = path.split('/').pop();
        const activeMap = {
            'index.html': 'home',
            'pricing.html': 'pricing',
            'agents.html': 'agents',
            'contact.html': 'contact'
        };
        const activeKey = activeMap[current];
        if (activeKey) {
            document.querySelectorAll('.navbar-link').forEach(link => {
                link.classList.toggle('active', link.dataset.page === activeKey);
            });
        }

        // Altura para el panel móvil
        if (navbar) {
            const rect = navbar.getBoundingClientRect();
            document.documentElement.style.setProperty('--navbar-height', `${rect.height}px`);
        }

        setActivePage();
        handleScroll();
    });

    // Cerrar menú si se redimensiona a desktop
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768 && navbarContent && navbarContent.classList.contains('active')) {
                closeMenu();
            }
            if (navbar) {
                const rect = navbar.getBoundingClientRect();
                document.documentElement.style.setProperty('--navbar-height', `${rect.height}px`);
            }
        }, 250);
    });

    // Actualizar activo en navegación
    window.addEventListener('popstate', setActivePage);
})();