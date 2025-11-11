// common.js

// Function to open WhatsApp chat with a predefined message
function openWhatsAppWithMessage(message) {
    const phoneNumber = '5491234567890'; // Replace with the actual phone number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Default WhatsApp message for the float button
function openWhatsApp() {
    const message = '¡Hola! Me gustaría obtener más información sobre sus servicios.';
    openWhatsAppWithMessage(message);
}

// Function to load footer dynamically
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback: if footer.html fails, maybe just append a simple footer
                footerPlaceholder.innerHTML = '<footer style="text-align: center; padding: 20px; background-color: #f0f0f0;">© 2025 Attomos. Todos los derechos reservados.</footer>';
            });
    }
}

// Call loadFooter immediately after common.js is parsed
loadFooter();
