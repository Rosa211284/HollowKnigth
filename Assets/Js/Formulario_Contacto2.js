"use strict";

/*- Elementos funcionales -*/

const form = document.querySelector(".formulario-contacto");
 response.setHeader("Access-Control-Allow-Origin", "*");

const btnEnviar = document.getElementById("btnEnviar");

const inputs = {
    nombre: document.querySelector("input[name='nombre']"),
    contra: document.querySelector("input[name='contra']")
};
alert("SI ENTR222");

/*- Elementos estéticos -*/

const loading = document.getElementById("loading");
const mensajeGlobal = document.getElementById("MensajeGlobal");

let mensajeTimeout;


/*- Utilidades -*/

function mostrarError(campo, mensaje) {

    const error = document.getElementById(`error-${campo}`);

    if (error) {
        error.textContent = mensaje;
    }

}


function limpiarErrores() {

    document.querySelectorAll(".error").forEach(elemento => {
        elemento.textContent = "";
    });

    mensajeGlobal.textContent = "";
    mensajeGlobal.style.color = "";

}

function validarFormulario() {

    let valido = true;
    const nombre = inputs.nombre.value.trim();
    const contra = inputs.contra.value;

    if (!nombre) {
        mostrarError(
            "nombre",
            "*El nombre de usuario es obligatorio."
        );
        valido = false;

    }
    /*- Validar contraseña -*/
    if (!contra) {
        mostrarError(
            "contra",
            "*La contraseña es obligatoria."
        );
        valido = false;
    }
    return valido;
}


/*------Validación en tiempo real--------------------*/

inputs.nombre.addEventListener("input", () => {
    const nombre = inputs.nombre.value.trim();
    if (!nombre) {
        mostrarError(
            "nombre",
            "El nombre de usuario es obligatorio."
        );
    } else {
        mostrarError("nombre", "");
    }

});

inputs.contra.addEventListener("input", () => {
    const contra = inputs.contra.value;
    if (!contra) {
        mostrarError(
            "contra",
            "La contraseña es obligatoria."
        );
    } else {
        mostrarError("contra", "");
    }

});


/*---------Mensaje global------------*/

function mostrarMensajeGlobal(texto, tipo) {

    mensajeGlobal.textContent = texto;

    mensajeGlobal.style.color =
        tipo === "success"
            ? "#28a745"
            : "#dc3545";

    clearTimeout(mensajeTimeout);

    mensajeTimeout = setTimeout(() => {

        mensajeGlobal.textContent = "";
        mensajeGlobal.style.color = "";

    }, 6000);

}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    limpiarErrores();

    if (!validarFormulario()) {

        mostrarMensajeGlobal(
            "*Revisa los campos del formulario.",
            "error"
        );

        return;
    }


/*---------------Mostrar loading---------------*/

    loading.style.display = "block";
    btnEnviar.disabled = true;

try {
        const formData = new FormData(form); //revisa que la nformaion no se envie toda junta si no por campo
        const response = await fetch("/config/login.php", {
            method: "POST",
            body: formData
        });

    

        const data = await response.json();

        loading.style.display = "none";
        btnEnviar.disabled = false;
        if(data.status === "success"){
           alert("¡Inicio de sesión correcto!");

    window.location.href = "index.html";
            
            form.reset();
        }else{
            mostrarMensajeGlobal(data.message,"error");
        }

    } catch (error) {
        loading.style.display = "none";
        btnEnviar.disabled = false;
        mostrarMensajeGlobal("*Error de conexion con el servidor", "error");
    }

});
