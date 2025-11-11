// ============================================
// CARRUSEL MEJORADO - PLATAFORMAS
// ============================================

class PlatformCarousel {
    constructor() {
        this.currentIndex = 0;
        this.platforms = document.querySelectorAll('.platform-block');
        this.totalPlatforms = this.platforms.length;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 segundos
        
        this.init();
    }
    
    init() {
        if (this.totalPlatforms === 0) return;
        
        // Mostrar primera plataforma
        this.showPlatform(0, 'none');
        
        // Event listeners para las flechas
        this.setupArrows();
        
        // Event listeners para teclado
        this.setupKeyboard();
        
        // Swipe para móvil
        this.setupSwipe();
        
        // Indicadores de progreso
        this.createIndicators();
        
        // Iniciar autoplay
        this.startAutoplay();
        
        // Pausar autoplay en hover
        this.setupHoverPause();
    }
    
    showPlatform(index, animation = 'fade') {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const current = this.platforms[this.currentIndex];
        const next = this.platforms[index];
        
        // Actualizar indicadores
        this.updateIndicators(index);
        
        // Animación de salida
        if (animation === 'slide-left') {
            current.style.animation = 'slideOutLeft 0.5s ease-out forwards';
        } else if (animation === 'slide-right') {
            current.style.animation = 'slideOutRight 0.5s ease-out forwards';
        } else {
            current.style.animation = 'fadeOut 0.3s ease-out forwards';
        }
        
        setTimeout(() => {
            current.style.display = 'none';
            next.style.display = 'grid';
            
            // Animación de entrada
            if (animation === 'slide-left') {
                next.style.animation = 'slideInRight 0.6s ease-out forwards';
            } else if (animation === 'slide-right') {
                next.style.animation = 'slideInLeft 0.6s ease-out forwards';
            } else {
                next.style.animation = 'fadeIn 0.5s ease-out forwards';
            }
            
            this.currentIndex = index;
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 600);
        }, animation === 'fade' ? 300 : 500);
    }
    
    nextPlatform() {
        const nextIndex = (this.currentIndex + 1) % this.totalPlatforms;
        this.showPlatform(nextIndex, 'slide-left');
        this.resetAutoplay();
    }
    
    prevPlatform() {
        const prevIndex = (this.currentIndex - 1 + this.totalPlatforms) % this.totalPlatforms;
        this.showPlatform(prevIndex, 'slide-right');
        this.resetAutoplay();
    }
    
    setupArrows() {
        // Encontrar todos los botones de flecha
        document.querySelectorAll('.carousel-arrow').forEach(arrow => {
            const isLeft = arrow.innerHTML.includes('chevron-left');
            
            arrow.addEventListener('click', (e) => {
                e.preventDefault();
                if (isLeft) {
                    this.prevPlatform();
                } else {
                    this.nextPlatform();
                }
            });
        });
    }
    
    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevPlatform();
            } else if (e.key === 'ArrowRight') {
                this.nextPlatform();
            }
        });
    }
    
    setupSwipe() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.platforms.forEach(platform => {
            platform.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            platform.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            }, { passive: true });
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                this.nextPlatform();
            } else {
                // Swipe right - prev
                this.prevPlatform();
            }
        }
    }
    
    createIndicators() {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        for (let i = 0; i < this.totalPlatforms; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Ir a plataforma ${i + 1}`);
            
            if (i === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                if (i !== this.currentIndex) {
                    const animation = i > this.currentIndex ? 'slide-left' : 'slide-right';
                    this.showPlatform(i, animation);
                    this.resetAutoplay();
                }
            });
            
            indicatorsContainer.appendChild(indicator);
        }
        
        // Insertar indicadores después de la sección de plataformas
        const platformsSection = document.querySelector('.platforms-section');
        if (platformsSection) {
            platformsSection.appendChild(indicatorsContainer);
        }
    }
    
    updateIndicators(index) {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextPlatform();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
    
    setupHoverPause() {
        this.platforms.forEach(platform => {
            platform.addEventListener('mouseenter', () => {
                this.stopAutoplay();
            });
            
            platform.addEventListener('mouseleave', () => {
                this.startAutoplay();
            });
        });
    }
}

// ============================================
// ANIMACIONES CSS ADICIONALES
// ============================================

const carouselStyles = `
/* Animaciones de entrada y salida */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutLeft {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(-100px);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100px);
    }
}

/* Mejoras visuales para el carrusel */
.platform-block {
    opacity: 0;
    transform: scale(0.95);
}

.platform-block[style*="display: grid"] {
    opacity: 1;
    transform: scale(1);
}

/* Indicadores del carrusel */
.carousel-indicators {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 60px;
    padding: 20px 0;
}

.carousel-indicator {
    width: 40px;
    height: 4px;
    background: #e5e7eb;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.carousel-indicator::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #06b6d4;
    transition: width 0.3s ease;
}

.carousel-indicator:hover {
    background: #d1d5db;
}

.carousel-indicator.active {
    background: #06b6d4;
    width: 60px;
}

.carousel-indicator.active::before {
    width: 100%;
    animation: progressBar 5s linear;
}

@keyframes progressBar {
    from { width: 0; }
    to { width: 100%; }
}

/* Mejoras en las flechas del carrusel */
.carousel-arrows {
    display: flex;
    gap: 16px;
    justify-content: center;
    position: relative;
    z-index: 10;
}

.carousel-arrow {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: white;
    border: 2px solid #e5e7eb;
    color: #374151;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
}

.carousel-arrow::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(6, 182, 212, 0.1);
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
}

.carousel-arrow:hover::before {
    width: 100%;
    height: 100%;
}

.carousel-arrow:hover {
    background: #06b6d4;
    color: white;
    border-color: #06b6d4;
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(6, 182, 212, 0.3);
}

.carousel-arrow:active {
    transform: scale(1.05);
}

/* Efecto de pulso en las flechas */
@keyframes pulse {
    0%, 100% {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    50% {
        box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
    }
}

.carousel-arrow:focus {
    outline: none;
    animation: pulse 2s infinite;
}

/* Mockup mejorado */
.mockup-phone {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.mockup-phone:hover {
    transform: scale(1.05) rotate(2deg);
}

/* Features con animación de entrada */
.platform-features li {
    animation: fadeInLeft 0.6s ease-out backwards;
}

.platform-features li:nth-child(1) { animation-delay: 0.1s; }
.platform-features li:nth-child(2) { animation-delay: 0.2s; }
.platform-features li:nth-child(3) { animation-delay: 0.3s; }
.platform-features li:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .carousel-arrow {
        width: 48px;
        height: 48px;
        font-size: 18px;
    }
    
    .carousel-indicators {
        margin-top: 40px;
    }
    
    .carousel-indicator {
        width: 30px;
    }
    
    .carousel-indicator.active {
        width: 45px;
    }
}

/* Barra de progreso superior (opcional) */
.carousel-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #06b6d4, #0891b2);
    transition: width 0.3s ease;
    border-radius: 0 3px 3px 0;
}

/* Contador de slides */
.carousel-counter {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
}

.carousel-counter .current {
    color: #06b6d4;
    font-weight: 700;
    font-size: 16px;
}
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = carouselStyles;
document.head.appendChild(styleSheet);

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrusel
    const carousel = new PlatformCarousel();
    
    // Hacer funciones globales disponibles (para mantener compatibilidad)
    window.nextPlatform = () => carousel.nextPlatform();
    window.prevPlatform = () => carousel.prevPlatform();
    
    // Agregar contador de slides (opcional)
    const platformsSection = document.querySelector('.platforms-section');
    if (platformsSection) {
        const counter = document.createElement('div');
        counter.className = 'carousel-counter';
        counter.innerHTML = `<span class="current">1</span> / ${carousel.totalPlatforms}`;
        platformsSection.appendChild(counter);
        
        // Actualizar contador
        const updateCounter = () => {
            const current = counter.querySelector('.current');
            if (current) {
                current.textContent = carousel.currentIndex + 1;
            }
        };
        
        // Observer para detectar cambios
        const observer = new MutationObserver(updateCounter);
        carousel.platforms.forEach(platform => {
            observer.observe(platform, { attributes: true, attributeFilter: ['style'] });
        });
    }
});

console.log('✅ Carrusel mejorado cargado correctamente');