
const salubra1 = document.querySelector("#salubra1")

var salubra = 1;

function Cambio_imagen(){
alert("click");
  if(salubra == 1){
        salubra = 2;
        cuadro3.style.backgroundImage = "url(../img/salubra.png)";
    }
    /*if(salubra == 2){
        salubra = 2;
        cuadro3.style.backgroundImage = "url(img/salubra2.png)";
    }*/
    else{
        salubra = 1;
        cuadro3.style.backgroundImage = "url(img/salubra3.png)";
    }
}