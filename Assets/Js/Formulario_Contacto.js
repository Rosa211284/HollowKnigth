/*---------- Elementos funcionales ----------*/
const form = document.querySelector(".formulario-contacto");
const btnEnviar = document.getElementById("btnEnviar");

const inputs = {
    nombre: document.querySelector("input[name='nombre']"),
    correo: document.querySelector("input[name='correo']")
    
};

/*---------- Elementos estéticos ----------*/
const loading = document.getElementById("loading");
const mensajeGlobal = document.getElementById("MensajeGlobal");

let mensajeTimeout;


/*---------- Utilidades ----------*/

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


/*---------- Validaciones ----------*/

function validar_Nombre(v) {
    const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/;

    return regex.test(v) && v.length >= 3 && v.length <= 30 && !/\s{2,}/.test(v);
}

function validar_Correo(v) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(v) && v.length >= 5 && v.length <= 50;
}


/*---------- Validación en tiempo real ----------*/

function validar_Campo(campo) {
    const input = inputs[campo];
    const v = input.value.trim();

    switch (campo) {

        case "nombre":

            if (!v) {
                mostrarError("nombre", "El nombre es obligatorio.");

            } else if (!validar_Nombre(v)) {
                mostrarError("nombre", "El nombre debe contener de 3 a 30 caracteres y solo letras.");

            } else {
                mostrarError("nombre", "");
            }

            break;


        case "correo":

            if (!v) {
                mostrarError("correo", "El correo es obligatorio.");

            } else if (!validar_Correo(v)) {
                mostrarError("correo", "Ingresa un correo electrónico válido.");

            } else {
                mostrarError("correo", "");
            }

            break;
    }
}


/*---------- Eventos en tiempo real-----------------*/
Object.keys(inputs).forEach(campo => {

    inputs[campo].addEventListener("input", () => {
        validar_Campo(campo);
    });

});


/*---------- Validación general ----------*/

function validarFormulario() {

    let valido = true;

    const nombre = inputs.nombre.value.trim();
    const correo = inputs.correo.value.trim();


    // Validación del nombre
    if (!nombre || !validar_Nombre(nombre)) {

        mostrarError("nombre", "Nombre inválido.");
        valido = false;

    }


/*----------------Validacion del correo----------------- */ 
    if (!correo || !validar_Correo(correo)) {

        mostrarError("correo", "Correo inválido.");
        valido = false;

    }

    return valido;
}


/*-----------Mensaje global-----------*/

function mostrarMensajeGlobal(texto, tipo) {

    mensajeGlobal.textContent = texto;

    mensajeGlobal.style.color =
        tipo === "success" ? "#28a745" : "#dc3545";

    clearTimeout(mensajeTimeout);

    mensajeTimeout = setTimeout(() => {

        mensajeGlobal.textContent = "";
        mensajeGlobal.style.color = "";

    }, 6000);
}


/*-----------Envío del formulario-----------*/

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    limpiarErrores();

    if (!validarFormulario()) {

        mostrarMensajeGlobal(
            "Revisa los campos del formulario.",
            "error"
        );

        return;
    }

    loading.style.display = "block";
    btnEnviar.disabled = true;


    try {

        const formData = new FormData(form);
        const response = await fetch("../Assets/php/conexion.php", {
            method: "POST",
            body: formData
        });


/*---------------respuesta del servidor-----------*/
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor.");
        }

        const data = await response.json();
        loading.style.display = "none";
        btnEnviar.disabled = false;

/*--------------------Registro bueno---------------------------------*/
        if (data.status === "success") {

            mostrarMensajeGlobal(
                "Registro exitoso. Bienvenido.",
                "success"
            );

            form.reset();
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000);


        } else {

            mostrarMensajeGlobal(data.message, "error");

        }


    } catch (error) {

        loading.style.display = "none";
        btnEnviar.disabled = false;

        mostrarMensajeGlobal(
            "Error de conexión con el servidor.",
            "error"
        );

        console.error(error);

    }

});





