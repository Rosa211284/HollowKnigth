
const intro = document.querySelector('.intro');
const logoSpan = document.querySelectorAll('.splash-logo');


window.addEventListener('DOMContentLoaded', () => {
   
    setTimeout(() => {

        // Animación de entrada logo
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 300); 
        });

        // Animación de salida logo
        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            })
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);

    setTimeout(() => {
            window.location.href = '../Indexs/crearSesion.html';
        }, 3000);

    }, 500);
});

