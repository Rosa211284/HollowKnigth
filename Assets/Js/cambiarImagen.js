const cuadro3 = document.querySelector("#salubra_cambioImagen");

var salubra = 1;

function Cambio_imagen() {

    salubra++;

    if (salubra > 3) {
        salubra = 1;
    }

    if (salubra == 1) {
        cuadro3.style.backgroundImage = "url('../Assets/Imagenes/a2.png')";
    }
    else if (salubra == 2) {
        cuadro3.style.backgroundImage = "url('../Assets/Imagenes/a3.png')";
    }
    else if (salubra == 3) {
        cuadro3.style.backgroundImage = "url('../Assets/Imagenes/salubra2.png')";
    }
}


/*--------------Audio---------------------------*/
const audio = document.querySelector("audio");

function inicio(){
   
 audio.play();
}

function pausa(){
   
audio.pause();
}