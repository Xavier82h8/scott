// ============================================
// INDEX.JS - Funcionalidades principales
// ============================================

// Scroll suave a la siguiente sección
function scrollToNextSection() {
    const nextSection = document.querySelector('.social-platforms-section, .why-section, .platforms-section');
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// [ELIMINADO] Bloque "CARRUSEL DE PLATAFORMAS" (se gestiona en carousel-enhanced.js)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.platforms-carousel');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.platform-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-arrow-left');
    const nextBtn = document.querySelector('.carousel-arrow-right');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Mostrar slide específico
    function showSlide(index) {
        // Remover clases activas
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Agregar clases activas
        slides[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        // Marcar slide anterior
        if (index > 0) {
            slides[index - 1].classList.add('prev');
        } else if (index === 0 && totalSlides > 1) {
            slides[totalSlides - 1].classList.add('prev');
        }
    }
    
    // Siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners para flechas
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Auto-play (opcional, comentado por defecto)
    // setInterval(nextSlide, 5000);
    
    // Mostrar primer slide al cargar
    showSlide(0);
});

// ============================================
// FAQ ACCORDION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los FAQs
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Abrir el clickeado si no estaba activo
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// BILLING TOGGLE (Mensual/Anual)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('billingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const prices = document.querySelectorAll('.plan-price');
    
    if (!toggle) return;
    
    let isYearly = false;
    
    toggle.addEventListener('click', function() {
        isYearly = !isYearly;
        this.classList.toggle('active');
        
        if (monthlyLabel) monthlyLabel.classList.toggle('active');
        if (yearlyLabel) yearlyLabel.classList.toggle('active');
        
        prices.forEach(price => {
            const monthly = price.getAttribute('data-monthly');
            const yearly = price.getAttribute('data-yearly');
            
            if (monthly && yearly) {
                if (isYearly) {
                    price.textContent = '$' + yearly;
                } else {
                    price.textContent = '$' + monthly;
                }
            }
        });
    });
});

// ============================================
// PLAN SELECTOR (Plan Electrón)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const planButtons = document.querySelectorAll('.plan-type-btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones del mismo grupo
            const parentButtons = this.closest('.plan-buttons');
            if (parentButtons) {
                parentButtons.querySelectorAll('.plan-type-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Aquí puedes agregar lógica adicional según el plan seleccionado
            const planType = this.textContent.trim();
            console.log('Plan seleccionado:', planType);
        });
    });
});

// ============================================
// GB SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const gbSlider = document.getElementById('gbSlider');
    const gbValue = document.getElementById('gbValue');
    
    if (gbSlider && gbValue) {
        gbSlider.addEventListener('input', function() {
            gbValue.textContent = this.value + ' GB';
            
            // Aquí puedes actualizar el precio según el GB seleccionado
            const basePrice = 999;
            const gbCost = parseInt(this.value) * 0.5; // $0.5 por GB adicional
            const totalPrice = Math.round(basePrice + gbCost);
            
            const priceElement = this.closest('.pricing-card').querySelector('.price-amount');
            if (priceElement) {
                priceElement.textContent = '$' + totalPrice;
            }
        });
    }
});

// ============================================
// CONTACT FORM VALIDATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validación básica
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor ingresa un email válido');
            return;
        }
        
        // Aquí normalmente enviarías los datos al servidor
        console.log('Formulario enviado:', data);
        
        // Mostrar mensaje de éxito
        if (successMessage) {
            successMessage.classList.add('show');
            
            // Ocultar después de 5 segundos
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
            // Scroll suave al mensaje
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Limpiar formulario
        this.reset();
    });
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#e5e7eb';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#06b6d4';
        });
    });
    
    // Validación de email específica
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ef4444';
            }
        });
    }
});

// ============================================
// SMOOTH SCROLL PARA TODOS LOS ENLACES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar, nav, header');
    
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Agregar sombra cuando se hace scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Ocultar/mostrar navbar en scroll (opcional)
        // if (currentScroll > lastScroll && currentScroll > 100) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        
        lastScroll = currentScroll;
    });
});

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));
});

// ============================================
// UTILITIES
// ============================================

// Debounce function para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para optimizar eventos
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    } else {
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.scrollToNextSection = scrollToNextSection;
window.copyToClipboard = copyToClipboard;

console.log('✅ Attomos JS cargado correctamente');

// // Navbar scroll effect  <-- REMOVIDO: lo gestiona navbar.js
// window.addEventListener('scroll', function() {
//     const navbar = document.getElementById('navbar');
//     if (!navbar) return;
//     if (window.scrollY > 50) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });

// Scroll-to-top
(function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="lni lni-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const copyrightText = document.querySelector('.footer-copyright');
    if (copyrightText) {
        const currentYear = new Date().getFullYear();
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2025', currentYear);
    }
})();