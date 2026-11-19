const url_endpoint = "http://localhost:3000";

const plantilla_enemigos = document.querySelector(".imagen-container");
const contenedor_enemigos = document.querySelector(".personas");

fetch(url_endpoint + "/enemigo_Sendero").then(recurso => recurso.json()).then(enemigos => {

    for(let j = 0; j < enemigos.arreglo.length; j++){
        const clon_enemigos = plantilla_enemigos.cloneNode(true);
        const nombre_enemigo = clon_enemigos.querySelector(".nombre_enemigo");
        nombre_enemigo.innerHTML = enemigos.arreglo[j].titulo;

        const descripcion_enemigos = clon_enemigos.querySelector(".descripcion_enemigos");
        descripcion_enemigos.innerHTML = enemigos.arreglo[j].descripcion;

        const imagen_enemigos = clon_enemigos.querySelector("img");
        imagen_enemigos.src = enemigos.arreglo[j].imagen2; 

        contenedor_enemigos.appendChild(clon_enemigos);
    }

});
