/*--------------------plantillas de crear amuletos---------------------------*/
const plantillaTarjeta = document.querySelector(".ContenedorItem");
const ColeccionItems = document.querySelector("#ColeccionItems");
const PantallaAgregarItem = document.querySelector(".PantallaAgregarItem");
plantillaTarjeta.remove();



/*----------------------plantilla informacion de los amueltos-------------------------------------------------*/
const contenedor_Amuleltos = document.querySelector(".amuletos_juego");
const plantilla_Amuletos = document.querySelector(".amuletos");
const url_endpoint = "http://localhost:3000";
plantilla_Amuletos.remove();



fetch(url_endpoint + "/informacion_tarjetas").then(recurso => recurso.json()).then(respuesta=>{
    for(i = 0; i< respuesta.arreglo.length; i++){
     const cloneTarjeta = plantillaTarjeta.cloneNode(true);

        ColeccionItems.appendChild(cloneTarjeta); 
        const titulo =  cloneTarjeta.querySelector(".Titulo");
        titulo.innerHTML = respuesta.arreglo[i].titulo;

        const Descripcion = cloneTarjeta.querySelector(".Descripcion");
        Descripcion.innerHTML = respuesta.arreglo[i].descripcion;

        const Imagen = cloneTarjeta.querySelector(".Imagen");
        Imagen.style.backgroundImage = "url(" + respuesta.arreglo[i].imagen+")";

        const PanelCreacionItem = cloneTarjeta.querySelector(".PanelCreacionItem");

        const Icono_Editar = cloneTarjeta.querySelector(".Icono_Editar");
        Icono_Editar.addEventListener("click",() =>{
            PanelCreacionItem.style.display = "flex";
        });

        const input_imagen = PanelCreacionItem.querySelector(".input_imagen")
        input_imagen.addEventListener("change", () => {
            const archivo = input_imagen.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = () =>{
                ImagenPreview.src = reader.result;
            }
        });

        const boton_guardar = PanelCreacionItem.querySelector(".boton_guardar");
        const _i = i;
        boton_guardar.addEventListener("click", () =>{
            const objeto_tarjetamodifcar ={


                id: respuesta.arreglo[_i].id,
                titulo: CrearItem_InputTitulo.value,
                descripcion: input_descripcion.value,
                imagen: ImagenPreview.src
            }
        /*-------------------------------------------------------------------------------------*/
           fetch(url_endpoint + "/editar_tarjeta", {
            method: "PUT",
            body: JSON.stringify(objeto_tarjetamodifcar)
           }).then(recurso => recurso.json()).then(respuesta =>{
            alert(respuesta.mensaje);
            window.location.reload();
           });
        });

       

        const CrearItem_InputTitulo = PanelCreacionItem.querySelector(".CrearItem_InputTitulo");
        CrearItem_InputTitulo.value = respuesta.arreglo[i].titulo;
        
        const input_descripcion = PanelCreacionItem.querySelector("textarea");
        input_descripcion.value = respuesta.arreglo[i].descripcion;

        const ImagenPreview = PanelCreacionItem.querySelector(".ImagenPreview");
        ImagenPreview.src = respuesta.arreglo[i].imagen;

        const objeto_recordar = {
            titulo:respuesta.arreglo[i].titulo,
            descripcion: respuesta.arreglo[i].descripcion,
            imagen: respuesta.arreglo[i].imagen
        }
        /*----------------------BOTON BORRAR------------------------------------------*/
        

         const Icono_Borrar = cloneTarjeta.querySelector(".Icono_Borrar");
         Icono_Borrar.addEventListener("click", () =>{
            const objeto_tarjeta_borrar = {
                id: respuesta.arreglo[_i].id
            }

       if( confirm("Estas seguro de que quieres borrra esta tarjeta")){
         fetch(url_endpoint + "/borrar_tarjeta", {
            method: "DELETE",
            body: JSON.stringify(objeto_tarjeta_borrar)}).then(recurso => recurso.json()).then(respuesta =>{
               
                window.location.reload();
            })
       }

         });
        

        const boton_cancelar = PanelCreacionItem.querySelector(".boton_cancelar");
        boton_cancelar.addEventListener("click", () =>{
            PanelCreacionItem.style.display = "none";

            CrearItem_InputTitulo.value = objeto_recordar.titulo,
            input_descripcion.value = objeto_recordar.descripcion,
            ImagenPreview.src = objeto_recordar.imagen;
        });


    }

    ColeccionItems.prepend(PantallaAgregarItem);
 
});
/*--------------------Crear las tarjetas------------------------------------------*/
function CrearTarjeta(){
    const nuevaTarjeta = plantillaTarjeta.cloneNode(true);
    //ColeccionItems.appendChild(nuevaTarjeta);
    const botonAgregar = document.querySelector(".PantallaAgregarItem");
ColeccionItems.insertBefore(nuevaTarjeta, botonAgregar);
    
    const PanelCreacionItem = nuevaTarjeta.querySelector(".PanelCreacionItem");
    PanelCreacionItem.style.display = "flex";

    const CrearItem_InputTitulo = nuevaTarjeta.querySelector(".CrearItem_InputTitulo");
    const input_imagen = nuevaTarjeta.querySelector(".input_imagen");
    const textarea = nuevaTarjeta.querySelector("textarea");
    const ImagenPreview = nuevaTarjeta.querySelector(".ImagenPreview");

    input_imagen.addEventListener("change", () =>{
       const archivo = input_imagen.files[0];
       const reader = new FileReader();
       reader.readAsDataURL(archivo);
       reader.onload = () => {
      ImagenPreview.src = reader.result;

       }
    });



 const boton_guardar = nuevaTarjeta.querySelector(".boton_guardar");
 boton_guardar.addEventListener("click", function(){
     const objeto_nuevaTarjeta = {
        titulo: CrearItem_InputTitulo.value,
        descripcion: textarea.value,
        imagen: ImagenPreview.src
      }
      fetch(url_endpoint + "/Crear", {
        method: "POST",
        body: JSON.stringify(objeto_nuevaTarjeta)
      }).then(recurso => {
        if(recurso.status == 200){
            window.location.reload();
        }
        else{
            alert("Algo salio mal");
        }
      });
 });

    const boton_cancelar = nuevaTarjeta.querySelector(".boton_cancelar");
    boton_cancelar.addEventListener("click", () =>{
        nuevaTarjeta.remove();
    });
 
}


/*-------------------------rellenar amuletos----------------------------------------------*/

fetch(url_endpoint + "/amuletos").then(recurso => recurso.json()).then(amuletos =>{
    console.log(amuletos);
   for(i= 0; i< amuletos.arreglo.length; i++){
    const clon_amuletos = plantilla_Amuletos.cloneNode(true);
    contenedor_Amuleltos.appendChild(clon_amuletos);
    
    const titulo_Amueltos = clon_amuletos.querySelector(".titulo_Amueltos");
    titulo_Amueltos.innerHTML = amuletos.arreglo[i].titulo;

    const descripcion_Amuletos = clon_amuletos.querySelector(".descripcion_Amuletos");
    descripcion_Amuletos.innerHTML = amuletos.arreglo[i].descripcion;

    
    const imagen_amuletos = clon_amuletos.querySelector("img");
    console.log(imagen_amuletos);
     imagen_amuletos.src = amuletos.arreglo[i].imagen2;
     console.log(amuletos.arreglo[i].imagen2);

    }

});


/*-----------------------------Sendero Verde personajes-----------------------------------*/
   
const contenedor_enemigos = document.querySelector(".personas");
const plantilla_enemigos = document.querySelector(".imagen-container");














