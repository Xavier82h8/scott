// Funciones comunes reutilizables
(function() {
    if (!window.openWhatsAppWithMessage) {
        window.openWhatsAppWithMessage = function(message) {
            const phoneNumber = '5491234567890';
            const encodedMessage = encodeURIComponent(message || '¡Hola! Me gustaría obtener más información sobre sus servicios.');
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        };
    }
    if (!window.openWhatsApp) {
        window.openWhatsApp = function() {
            window.openWhatsAppWithMessage('¡Hola! Me gustaría obtener más información sobre sus servicios.');
        };
    }
    // Nota: No cargamos el footer dinámicamente; usamos el footer HTML estático con footer.css
})();

// Navbar scroll effect
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navbar = document.querySelector('.navbar');
    if (mobileMenuIcon && navbar) {
        mobileMenuIcon.addEventListener('click', () => {
            navbar.classList.toggle('open');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const waFloat = document.querySelector('.whatsapp-float');
    if (!waFloat) return;

    const numberAttr = waFloat.getAttribute('data-wa-number');
    const number = (numberAttr && numberAttr.trim()) ? numberAttr.trim() : '5491234567890';

    waFloat.style.pointerEvents = 'auto';

    waFloat.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const url = `https://wa.me/${number}`;
        window.open(url, '_blank');
    });
});
