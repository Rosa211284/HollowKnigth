"use strict";


/*-Elementos Funcionales*/
const form = document.querySelector(".formulario-contacto");
 response.setHeader("Access-Control-Allow-Origin", "*");
const btnEnviar = document.getElementById("btnEnviar");
const inputs ={
    nombre: document.querySelector("input[name='nombre']"),
    contra: document.querySelector("input[name='contra']"),
    correo: document.querySelector("input[name='correo']"),
};

/*----------------Elementos esteticos*/

const loading = document.getElementById("loading");
const mensajeGlobal = document.getElementById("MensajeGlobal");

let mensajeTimeout;


/*----------------Utilidades-*/
function mostrarError(campo,mensaje){
    const error = document.getElementById(`error-${campo}`);
    if(error) error.textContent = mensaje;
}
 function LimpiarErrores(){
    document.querySelectorAll(".error").forEach(elemento => elemento.textContent = "");
    mensajeGlobal.textContent ="";
    mensajeGlobal.style.color = "";
}



/*-----------Validaciones*/

function validar_Nombre(v){
    //validacion
    const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
    //retorna la validacion y revisa que testea 
    return regex.test(v) && v.length >= 3 && v.length <= 30 && !/\s{2,}/.test(v);
}

function validar_Contra(v){
    //validacion
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    //retorna la validacion y revisa que testea 
    return regex.test(v) && v.length >= 3 && v.length <= 30 && !/\s{2,}/.test(v);
}

function validar_Correo(v){
    const regex =  /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return regex.test(v) && v.length >= 5 && v.length <= 30 && !/\s{2,}/.test(v);
}

/*-Validacion en tiempo real-*/

function validar_Campo(campo){
    const input = inputs[campo];
    const v = input.value.trim();  //trim quita los espacios extras __  __

    switch(campo){
        case "nombre":
            if(!v){
                mostrarError("nombre", "El nombre es Obligatorio");
            }else if(!validar_Nombre(v)){
                mostrarError("nombre", "Solo letras (3 a 30 caracteres)");
            }else {
                mostrarError("nombre", "");
            }
            break;

         case "contra":
            if(!v){
                mostrarError("contra", "La contrasena es Obligatoria");
            }else if(!validar_Contra(v)){
                mostrarError("contra", "La contrasena debe tener al menos un caracter especial * y una mmayuscula");
            }else {
                mostrarError("contra", "");
            }
            break;

        case "correo":
            if(!v){
                mostrarError("correo", "El correo es Obligatorio");
            }else if(!validar_Correo(v)){
                mostrarError("correo", "Solo letras (3 a 30 caracteres)");
            }else {
                mostrarError("correo", "");
            }
            break;
            
    }
}

//Eventos en tiempo real

Object.keys(inputs).forEach(campo => {
    inputs[campo].addEventListener("input", () => validar_Campo(campo));
});

//Validacion General/ //segunda validacion pero ya de todo
function validarFormulario(){
    let valido = true;
    const nombre = inputs.nombre.value.trim(); //
    const contra = inputs.contra.value.trim();
    const correo = inputs.correo.value.trim();


    if(!nombre || !validar_Nombre(nombre)){//es por si alguna de las dos falla
    mostrarError("nombre", "*Nombre Invalido.");
    valido = false;
    }

     if(!contra || !validar_Contra(contra)){//es por si alguna de las dos falla
    mostrarError("contra", "*contrasena Invalido.");
    valido = false;
    }

    if(!correo || !validar_Correo(correo)){//es por si alguna de las dos falla
    mostrarError("correo", "*correo Invalido.");
    valido = false;
    }

        return valido; 
    }
//Envio simulado



/*-Mensaje Global*/
function mostrarMensajeGlobal(texto, tipo){
    mensajeGlobal.textContent = texto;
    mensajeGlobal.style.color = 
    tipo === "success" ? "#28a745" : "#dc3545";
    clearTimeout(mensajeTimeout);

    mensajeTimeout = setTimeout(() => {
        mensajeGlobal.textContent = "";
        mensajeGlobal.style.color = "";
    }, 6000);
}

/*-Boton de SUBMIT enviar-*/

form.addEventListener("submit", async(e) =>{
    e.preventDefault(); //resetea el comportamiento del formulario
    LimpiarErrores();
    mensajeGlobal.textContent = "";

    if(!validarFormulario()){
        mostrarMensajeGlobal("*Revisa los campos del formulario", "Error");
        return;
    }

    //UI Loading
    loading.style.display = "block";
    btnEnviar.disabled = true;

    try {
        const formData = new FormData(form); //revisa que la nformaion no se envie toda junta si no por campo
        const response = await fetch("config/conexion.php", {
            method: "POST",
            body: formData
        });

    

        const data = await response.json();

        loading.style.display = "none";
        btnEnviar.disabled = false;

        //Si php responde algo que se limpie el formulario
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





