function pruebasDOM(){
    console.log(document);

    nodo = document.getElementById("dato");
    console.log(nodo.value);

    // búsqueda por nombre:

    // devuelve un array indexado
    nombres = document.getElementsByName("accion");
    console.log(nombres);

    for(var a=0; a<nombres.length; a++){
        console.log(nombres[a].value);
    }

    // búsqueda por nombre de etiqueta o elemento:

    nodos = document.getElementsByTagName("td");
    for(var a=0; a<nodos.length; a++){
        console.log(nodos[a].id);
    }

    // búsqueda por estilo:
    // devuelve array

    clases = document.getElementsByClassName("xxx");
    for(var a=0; a<clases.length; a++){
        console.log(clases[a].id);
    }

    // buscando en los hijos de un nodo:
    console.log("=============================");
    formulario = document.getElementById("formulario");
    hijos = formulario.childNodes;
    // coge también los nodos de texto que hay entre elementos, esto es los espacios y saltos de línea
    for(var a=0; a<hijos.length; a++){
        console.log(hijos[a]);
    }

}

function validar() {
    nombre = document.getElementById("nombre");
    direccion = document.getElementById("direccion");
    if(nombre.value.trim() == "" || direccion.value.trim() == ""){
        alert("debe rellenar los campos nombre y dirección");
    } else {
        alert("ok");
    }
}

function prepararParametros() {
   /*  parametros = "nombre="+document.getElementById("nombre").value+"&"+
                 "direccion="+document.getElementById("direccion").value+"&"+
                 "telefono="+document.getElementById("telefono").value+"&"+
                 "ciudad="+document.getElementById("ciudad").value+"&"+
                 "observaciones="+document.getElementById("observaciones").value; */

   //los nodos de tipo formulario tienen un segundo array en el que
   // se incluyen los campos del formulario (todo lo que tenga "name" se incluye)
    var formulario = document.getElementById("formulario");
    var campos = formulario.elements;
    var parametros ="";

    for(var a = 0; a < campos.length; a++){
        var nodo = campos[a];
        console.log(nodo.id);

        // ignorar botones:
        if(nodo.type == "button" || nodo.type == "submit") {
            continue;
        }
        parametros += nodo.name + "=" + nodo.value + "&";
    }

    // para quitar el último &
    console.log(parametros.substring(0,parametros.length-1));    

}