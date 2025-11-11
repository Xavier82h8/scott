// ============================================
// CARRUSEL DE PLATAFORMAS MEJORADO
// ============================================

(function() {
    'use strict';

    // Variables globales
    let currentPlatform = 0;
    const platforms = document.querySelectorAll('[data-platform]');
    const platformsSection = document.querySelector('.platforms-section');
    
    // Verificar que existan plataformas
    if (!platforms.length || !platformsSection) {
        console.warn('No se encontraron plataformas para el carrusel');
        return;
    }

    // ============================================
    // CREAR FLECHAS DE NAVEGACIÓN
    // ============================================
    function createNavigationArrows() {
        // Si ya existe un grupo de flechas dentro de la sección, salir
        if (platformsSection.querySelector('.carousel-arrow-group')) {
            return;
        }

        // Contenedor centrado con gap consistente
        const arrowGroup = document.createElement('div');
        arrowGroup.className = 'carousel-arrow-group';

        // Flecha anterior
        const prevArrow = document.createElement('button');
        prevArrow.className = 'carousel-arrow prev';
        prevArrow.setAttribute('aria-label', 'Plataforma anterior');
        prevArrow.innerHTML = '<i class="lni lni-chevron-left"></i>';

        // Flecha siguiente
        const nextArrow = document.createElement('button');
        nextArrow.className = 'carousel-arrow next';
        nextArrow.setAttribute('aria-label', 'Plataforma siguiente');
        nextArrow.innerHTML = '<i class="lni lni-chevron-right"></i>';

        // Agregar al grupo y a la sección (no como hermanos de la sección)
        arrowGroup.appendChild(prevArrow);
        arrowGroup.appendChild(nextArrow);
        platformsSection.appendChild(arrowGroup);

        // Listeners
        prevArrow.addEventListener('click', () => navigatePlatform('prev'));
        nextArrow.addEventListener('click', () => navigatePlatform('next'));

        // Soporte para teclado
        [prevArrow, nextArrow].forEach(btn => {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.classList.contains('prev') ? navigatePlatform('prev') : navigatePlatform('next');
                }
            });
        });
    }

    // ============================================
    // MOSTRAR PLATAFORMA ESPECÍFICA
    // ============================================
    function showPlatform(index) {
        platforms.forEach((platform, i) => {
            if (i === index) {
                platform.style.display = 'grid';
                platform.style.willChange = 'opacity, transform';
                platform.style.opacity = '0';
                platform.style.transform = 'translateY(30px)';

                // Forzar reflow
                platform.offsetHeight;
                
                // Animar entrada con tiempos sincronizados a CSS variables
                requestAnimationFrame(() => {
                    platform.style.transition = 'opacity var(--transition-medium) ease, transform var(--transition-medium) ease';
                    platform.style.opacity = '1';
                    platform.style.transform = 'translateY(0)';
                });

                // Reproducir video si existe
                const video = platform.querySelector('.phone-screen-video');
                if (video) {
                    video.play().catch(err => console.log('Video autoplay prevented:', err));
                }
            } else {
                platform.style.display = 'none';
                
                // Pausar videos inactivos
                const video = platform.querySelector('.phone-screen-video');
                if (video) {
                    video.pause();
                }
            }
        });

        // Actualizar atributo ARIA
        platformsSection.setAttribute('aria-live', 'polite');
        platformsSection.setAttribute('aria-atomic', 'true');
    }

    // ============================================
    // NAVEGAR ENTRE PLATAFORMAS
    // ============================================
    function navigatePlatform(direction) {
        if (direction === 'next') {
            currentPlatform = (currentPlatform + 1) % platforms.length;
        } else if (direction === 'prev') {
            currentPlatform = (currentPlatform - 1 + platforms.length) % platforms.length;
        }
        
        showPlatform(currentPlatform);
    }

    // ============================================
    // NAVEGACIÓN CON TECLADO
    // ============================================
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const rect = platformsSection.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isInViewport) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigatePlatform('prev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigatePlatform('next');
            }
        });
    }

    // ============================================
    // NAVEGACIÓN CON SWIPE EN MÓVIL
    // ============================================
    function initTouchNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        platformsSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        platformsSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) < minSwipeDistance) return;
            swipeDistance > 0 ? navigatePlatform('prev') : navigatePlatform('next');
        }
    }

    // ============================================
    // AUTO-PLAY OPCIONAL (DESHABILITADO)
    // ============================================
    function initAutoPlay(intervalMs = 5000) {
        let autoPlayInterval;

        function startAutoPlay() {
            autoPlayInterval = setInterval(() => navigatePlatform('next'), intervalMs);
        }
        function stopAutoPlay() { clearInterval(autoPlayInterval); }

        platformsSection.addEventListener('mouseenter', stopAutoPlay);
        platformsSection.addEventListener('mouseleave', startAutoPlay);

        platformsSection.querySelectorAll('.carousel-arrow').forEach(arrow => {
            arrow.addEventListener('click', () => {
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            });
        });

        // startAutoPlay();
    }

    // ============================================
    // LAZY LOADING DE VIDEOS
    // ============================================
    function initLazyVideos() {
        const videos = document.querySelectorAll('.phone-screen-video');
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const source = video.querySelector('source');
                    if (source && !video.src) {
                        video.src = source.src;
                        video.load();
                    }
                }
            });
        }, { rootMargin: '50px' });
        videos.forEach(video => videoObserver.observe(video));
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    function init() {
        createNavigationArrows();
        showPlatform(0);
        initKeyboardNavigation();
        initTouchNavigation();
        initLazyVideos();
        // initAutoPlay(5000);
        console.log('✅ Carrusel inicializado correctamente');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();