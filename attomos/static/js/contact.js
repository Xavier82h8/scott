// ============================================
// FORMULARIO DE CONTACTO - MEJORADO Y SIMPLIFICADO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('contactSubmit');

    // ============================================
    // VALIDACIÓN DE CAMPOS
    // ============================================
    
    function validateField(input) {
        let valid = true;
        let message = '';
        const value = input.value.trim();

        // Validaciones según el tipo de campo
        if (input.name === 'firstName' || input.name === 'lastName') {
            valid = value.length >= 2;
            if (!valid) message = 'Debe tener al menos 2 caracteres.';
        }
        
        if (input.name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            valid = emailRegex.test(value);
            if (!valid) message = 'Ingresa un email válido.';
        }
        
        if (input.name === 'subject') {
            valid = value !== '' && value !== 'Selecciona un asunto';
            if (!valid) message = 'Selecciona un asunto.';
        }
        
        if (input.name === 'message') {
            valid = value.length >= 10;
            if (!valid) message = 'Escribe al menos 10 caracteres.';
        }
        
        if (input.name === 'phone') {
            // Campo opcional, siempre válido
            valid = true;
            message = '';
        }

        // Aplicar clases de validación
        input.classList.toggle('is-invalid', !valid && value.length > 0);
        input.classList.toggle('is-valid', valid && value.length > 0);

        // Mostrar/ocultar mensaje de error
        const errorEl = input.parentElement.querySelector('.field-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = (!valid && value.length > 0) ? 'flex' : 'none';
        }

        return valid;
    }

    // ============================================
    // EVENT LISTENERS PARA VALIDACIÓN EN TIEMPO REAL
    // ============================================
    
    const formInputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    formInputs.forEach(input => {
        // Validar al escribir (con debounce)
        let timeout;
        input.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => validateField(input), 300);
        });
        
        // Validar al salir del campo
        input.addEventListener('blur', () => {
            if (input.value.trim().length > 0) {
                validateField(input);
            }
        });
        
        // Limpiar estados al hacer focus si está vacío
        input.addEventListener('focus', () => {
            if (input.value.trim().length === 0) {
                input.classList.remove('is-valid', 'is-invalid');
                const errorEl = input.parentElement.querySelector('.field-error');
                if (errorEl) errorEl.style.display = 'none';
            }
        });
    });

    // ============================================
    // ENVÍO DEL FORMULARIO
    // ============================================
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validar todos los campos requeridos
        const requiredFields = [
            form.firstName,
            form.lastName,
            form.email,
            form.subject,
            form.message
        ];

        const allValid = requiredFields.every(field => validateField(field));

        if (!allValid) {
            // Hacer scroll al primer campo inválido
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                firstInvalid.focus();
            }
            return;
        }

        // Estado loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.style.opacity = '0.7';

        // Simular envío (reemplazar con tu API)
        setTimeout(() => {
            // Estado success
            submitBtn.innerHTML = '<i class="lni lni-checkmark-circle"></i> <span>¡Enviado!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            submitBtn.style.opacity = '1';

            // Mostrar mensaje de éxito
            successMessage.classList.add('show');

            // Limpiar formulario
            form.reset();
            formInputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
                const errorEl = input.parentElement.querySelector('.field-error');
                if (errorEl) errorEl.style.display = 'none';
            });

            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="button-text">Enviar Mensaje</span><i class="lni lni-arrow-right button-icon"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)';
                submitBtn.disabled = false;
                successMessage.classList.remove('show');
            }, 3000);
        }, 1500);
    });

    // ============================================
    // MEJORA: CAMBIAR COLOR DE FLECHA DEL SELECT
    // ============================================
    
    const selectElement = form.querySelector('.form-select');
    if (selectElement) {
        selectElement.addEventListener('change', function() {
            if (this.value) {
                this.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 12 12'%3E%3Cpath fill='%2306b6d4' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")";
            }
        });
    }
});