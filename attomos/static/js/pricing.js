document.addEventListener('DOMContentLoaded', function() {
    const monthlyOption = document.getElementById('monthlyOption');
    const yearlyOption = document.getElementById('yearlyOption');
    const pricingCards = document.querySelectorAll('.pricing-card');

    function updatePrices(isYearly) {
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.plan-price');
            const monthlyPrice = priceElement.getAttribute('data-monthly');
            const yearlyPrice = priceElement.getAttribute('data-yearly');

            if (isYearly) {
                priceElement.textContent = `$${yearlyPrice}`;
            } else {
                priceElement.textContent = `$${monthlyPrice}`;
            }
        });
    }

    monthlyOption.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            yearlyOption.classList.remove('active');
            updatePrices(false);
        }
    });

    yearlyOption.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            monthlyOption.classList.remove('active');
            updatePrices(true);
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-icon').textContent = '+';
            });

            // Open the clicked item if it wasn't already active
            if (!wasActive) {
                item.classList.add('active');
                icon.textContent = '-';
            }
        });
    });
});

function openWhatsApp() {
    // Reemplaza con tu número de WhatsApp
    window.open('https://wa.me/TUNUMERO', '_blank');
}

// Billing Toggle
(function() {
    const toggle = document.getElementById('billingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const prices = document.querySelectorAll('.plan-price');

    if (toggle && monthlyLabel && yearlyLabel && prices.length) {
        let isYearly = false;

        toggle.addEventListener('click', function() {
            isYearly = !isYearly;
            this.classList.toggle('active');

            monthlyLabel.classList.toggle('active');
            yearlyLabel.classList.toggle('active');

            prices.forEach(price => {
                const monthly = price.getAttribute('data-monthly');
                const yearly = price.getAttribute('data-yearly');
                price.textContent = isYearly ? `$${yearly}` : `$${monthly}`;
            });
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Scroll-to-top
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

    // Update year
    const copyrightText = document.querySelector('.footer-copyright');
    if (copyrightText) {
        const currentYear = new Date().getFullYear();
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2025', currentYear);
    }
})();
