// ============================================
// CONTACT FORM - FUNCIONALIDAD COMPLETA
// ============================================

(function() {
    'use strict';

    // Elementos del DOM
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = document.getElementById('contactSubmit');

    // Campos del formulario
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    // Contenedores de campos (para añadir clases de validación)
    const fieldContainers = {
        firstName: document.getElementById('ff-firstName'),
        lastName: document.getElementById('ff-lastName'),
        email: document.getElementById('ff-email'),
        phone: document.getElementById('ff-phone'),
        subject: document.getElementById('ff-subject'),
        message: document.getElementById('ff-message')
    };

    // Mensajes de error
    const errorMessages = {
        firstNameError: document.getElementById('firstNameError'),
        lastNameError: document.getElementById('lastNameError'),
        emailError: document.getElementById('emailError'),
        phoneError: document.getElementById('phoneError'),
        subjectError: document.getElementById('subjectError'),
        messageError: document.getElementById('messageError')
    };

    // ============================================
    // VALIDACIONES
    // ============================================

    const validators = {
        firstName: (value) => {
            if (!value.trim()) return 'El nombre es obligatorio';
            if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo puede contener letras';
            return '';
        },

        lastName: (value) => {
            if (!value.trim()) return 'El apellido es obligatorio';
            if (value.trim().length < 2) return 'El apellido debe tener al menos 2 caracteres';
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El apellido solo puede contener letras';
            return '';
        },

        email: (value) => {
            if (!value.trim()) return 'El email es obligatorio';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Por favor ingresa un email válido';
            return '';
        },

        phone: (value) => {
            // El teléfono es opcional, pero si se ingresa debe ser válido
            if (value.trim() && !/^[\d\s\-\+\(\)]{7,20}$/.test(value)) {
                return 'Por favor ingresa un teléfono válido';
            }
            return '';
        },

        subject: (value) => {
            if (!value || value === '') return 'Por favor selecciona un asunto';
            return '';
        },

        message: (value) => {
            if (!value.trim()) return 'El mensaje es obligatorio';
            if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
            if (value.trim().length > 1000) return 'El mensaje no puede exceder 1000 caracteres';
            return '';
        }
    };

    // ============================================
    // FUNCIONES DE VALIDACIÓN
    // ============================================

    function validateField(fieldName) {
        const field = fields[fieldName];
        const container = fieldContainers[fieldName];
        const errorElement = errorMessages[`${fieldName}Error`];

        if (!field || !container) return true;

        const errorMessage = validators[fieldName](field.value);

        if (errorMessage) {
            container.classList.add('is-invalid');
            container.classList.remove('is-valid');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
            return false;
        } else {
            container.classList.remove('is-invalid');
            container.classList.add('is-valid');
            if (errorElement) {
                errorElement.textContent = '';
            }
            return true;
        }
    }

    function validateAllFields() {
        let isValid = true;
        for (let fieldName in fields) {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        }
        return isValid;
    }

    // ============================================
    // EVENTOS DE CAMPOS (labels flotantes y validación)
    // ============================================

    function setupFieldEvents() {
        for (let fieldName in fields) {
            const field = fields[fieldName];
            const container = fieldContainers[fieldName];

            if (!field || !container) continue;

            // Focus
            field.addEventListener('focus', () => {
                container.classList.add('is-focused');
            });

            // Blur
            field.addEventListener('blur', () => {
                container.classList.remove('is-focused');

                // Actualizar clase has-value
                if (field.value.trim()) {
                    container.classList.add('has-value');
                } else {
                    container.classList.remove('has-value');
                }

                // Validar al perder el foco
                validateField(fieldName);
            });

            // Input - actualizar has-value en tiempo real
            field.addEventListener('input', () => {
                if (field.value.trim()) {
                    container.classList.add('has-value');
                } else {
                    container.classList.remove('has-value');
                }

                // Limpiar error mientras escribe
                if (container.classList.contains('is-invalid')) {
                    container.classList.remove('is-invalid');
                    const errorElement = errorMessages[`${fieldName}Error`];
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            });
        }

        // Validación especial para el select
        if (fields.subject) {
            fields.subject.addEventListener('change', () => {
                validateField('subject');
            });
        }
    }

    // ============================================
    // ENVÍO DEL FORMULARIO
    // ============================================

    function handleSubmit(e) {
        e.preventDefault();

        // Validar todos los campos
        if (!validateAllFields()) {
            // Scroll al primer campo con error
            const firstError = document.querySelector('.form-field.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Deshabilitar botón
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="button-text">Enviando...</span><i class="lni lni-spinner-arrow button-icon rotating"></i>';

        // Obtener datos del formulario
        const formData = {
            firstName: fields.firstName.value.trim(),
            lastName: fields.lastName.value.trim(),
            email: fields.email.value.trim(),
            phone: fields.phone.value.trim(),
            subject: fields.subject.value,
            message: fields.message.value.trim()
        };

        // Simular envío al servidor (aquí debes agregar tu lógica real)
        setTimeout(() => {
            console.log('Datos del formulario:', formData);

            // Aquí irá tu llamada AJAX/Fetch real
            // Ejemplo:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                showSuccessMessage();
                resetForm();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span class="button-text">Enviar Mensaje</span><i class="lni lni-arrow-right button-icon"></i>';
            });
            */

            // Simulación exitosa
            showSuccessMessage();
            resetForm();

            // Rehabilitar botón
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="button-text">Enviar Mensaje</span><i class="lni lni-arrow-right button-icon"></i>';
        }, 1500);
    }

    // ============================================
    // MENSAJE DE ÉXITO
    // ============================================

    function showSuccessMessage() {
        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Ocultar después de 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }

    // ============================================
    // RESETEAR FORMULARIO
    // ============================================

    function resetForm() {
        form.reset();

        // Limpiar todas las clases de validación
        for (let fieldName in fieldContainers) {
            const container = fieldContainers[fieldName];
            if (container) {
                container.classList.remove('is-valid', 'is-invalid', 'has-value', 'is-focused');
            }
        }

        // Limpiar mensajes de error
        for (let errorName in errorMessages) {
            const errorElement = errorMessages[errorName];
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    }

    // ============================================
    // ANIMACIÓN DEL BOTÓN
    // ============================================

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .rotating {
            animation: rotate 1s linear infinite;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // INICIALIZACIÓN
    // ============================================

    function init() {
        if (!form) {
            console.warn('Formulario de contacto no encontrado');
            return;
        }

        setupFieldEvents();
        form.addEventListener('submit', handleSubmit);

        console.log('✅ Formulario de contacto inicializado');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ============================================
// INTEGRACIÓN CON WHATSAPP BUTTON
// ============================================

(function() {
    const whatsappButton = document.querySelector('.whatsapp-float');

    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('data-wa-number') || '5491234567890';
            const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre Attomos.');
            const url = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(url, '_blank');
        });
    }
})();
