# Checklist de Errores

## index.html
- **Integración de mockup.png:** El `mockup.png` no enmarca correctamente el video. El video parece estar desbordado o mal alineado.
- **Revisión de CSS:** El CSS para la sección del mockup necesita ser revisado en busca de propiedades que puedan estar causando el problema de diseño. Específicamente, se deben revisar `.mockup-phone`, `.phone-screen-video`, y `.mockup-frame`.

## contact.html
- **Diseño del formulario:** El formulario a la derecha tiene un "diseño raro". Se necesita identificar qué está mal específicamente. El CSS muestra un estilo complejo con etiquetas flotantes, iconos y estados de validación personalizados. El problema podría estar relacionado con el posicionamiento de estos elementos.
- **Corrección de lógica y diseño:** Se necesita revisar la estructura HTML del formulario y el CSS correspondiente en `contact.css` para simplificar y corregir el diseño. Esto implicará verificar la disposición, el espaciado y la alineación de los campos del formulario.
- **Responsividad:** El diseño "raro" podría ser un problema de responsividad. Se necesita verificar cómo se ve el formulario en diferentes tamaños de pantalla.
