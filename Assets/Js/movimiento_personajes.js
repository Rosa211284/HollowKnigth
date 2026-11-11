const personajes = document.querySelectorAll('.personajes, .personajes2');

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        } else {
            entrada.target.classList.remove('visible');
        }

    });

}, {
    threshold: 0.2
});

personajes.forEach((personaje) => {
    observador.observe(personaje);
});