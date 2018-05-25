
function crearTabla(parametros){

    //El array de objetos con los que se rellenará la tabla
    let objetos = parametros.objetos;
    //Las propiedades del objeto que queremos en la tabla
    let propiedades = parametros.propiedades;
    //Los nombres de las cabeceras (opcional).
    //si no está presente, se usarán las propiedades como nombres de las columnas
    let cabeceras = parametros.cabeceras;
    if( typeof cabeceras == 'undefined'){
        cabeceras = propiedades;
    }

    let tabla = document.createElement("table");
    tabla.setAttribute("align","center");
    tabla.setAttribute("border","1");
    let trCabecera = document.createElement("tr");
    for(let a=0; a<propiedades.length; a++){
        let th = document.createElement("th");
        let txt = document.createTextNode(cabeceras[a]);
        th.appendChild(txt);
        trCabecera.appendChild(th);
    }
    tabla.appendChild(trCabecera);  

    for(let a=0; a<objetos.length; a++){
        let objeto = objetos[a];
        let tr = document.createElement("tr");
        tr.objeto = objeto;

        //Si viene el parámetro 'onclick' le colocamos el onclick al tr
        if( typeof parametros.onclick == 'function' ){
            tr.onclick = parametros.onclick;
        }

        for(let b=0; b<propiedades.length; b++){
            let td = document.createElement("td");            
            let txt = document.createTextNode(objeto[propiedades[b]]);
            td.appendChild(txt);
            tr.appendChild(td);
        }

        tabla.appendChild(tr);        
    }

    //Si viene el parametro 'enchufarselaA' colocamos la tabla como hija
    //del nodo indicado
    if( typeof parametros.enchufarselaA != 'undefined' ){
        document.getElementById(parametros.enchufarselaA).innerHTML = "";
        document.getElementById(parametros.enchufarselaA).appendChild(tabla);
    }

    return tabla;
}

function vaciarFormularioGenerico(idFormulario){
    let form = document.getElementById(idFormulario);
    for(let a=0; a<form.elements.length; a++){
        let campo = form.elements[a];
        campo.value = "";
    }
}

function rellenarFormulario(idFormulario, objeto){
    let formulario = document.getElementById(idFormulario);
    for(let a=0; a<formulario.elements.length; a++){
        let campo = formulario.elements[a];
        campo.value = objeto[campo.name];
    }

}

function crearObjeto(idFormulario, funcion){

    let objeto = {};
    if( typeof funcion == 'function'){
        objeto = new funcion();
    }

    console.log(objeto);

    let formulario = document.getElementById(idFormulario);
    for(let a=0; a<formulario.elements.length; a++){
        let campo = formulario.elements[a];
        objeto[campo.name] = campo.value;
    }

    console.log(objeto);

    return objeto;
}

function addOnclick(){
    let inputs = document.getElementsByTagName("input");
    for(let a=0; a<inputs.length; a++){
        let nodo = inputs[a];
        let id = nodo.id;
        if(id.startsWith("btn_")){
            let nombreFuncion = id.split("_")[1];
            nodo.onclick = window[nombreFuncion];
        }
    }
}