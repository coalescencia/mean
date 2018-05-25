function documentWrite(){
    document.write("<h2>document write</h2>");
}

function innerHTML(){
    let div = document.getElementById("div1").innerHTML="<h2>Un innerHTML</h2>";
}

function vaciarInnerHTML(){
    document.getElementById("div1").innerHTML ="";
}

function crearNodos(){
    let _h1 = document.createElement("h1");
    let txt = document.createTextNode("agregamos un elemento");
   // creando atributos a la antigua:
   //let align = document.createAttribute("center");
   //  _h1.setAttributeNode(align);
    _h1.setAttribute("align","center");
    _h1.appendChild(txt);
    
    document.getElementById("div2").appendChild(_h1);

    let peliculas = getPeliculas();

    let tabla = document.createElement("table");
    tabla.setAttribute("align","center");
    tabla.setAttribute("border","1");
    tabla.innerHTML = "<tr><td>titulo</td><td>director<td>genero</td><td>Año</td></tr>";  
    
    for(var i = 0; i < peliculas.length; i++) {
        tabla.innerHTML+="<tr><td>"+peliculas[i]['titulo']+"</td><td>"+peliculas[i]['director']+"</td><td>"+
        peliculas[i]['genero']+"</td><td>"+peliculas[i]['year']+"</td></tr>";      
    }
    document.getElementById("div2").appendChild(tabla);

}

function getPeliculas(){
    // simulamos petición al servidor para obtener una lista de películas
    let peliculas = [
        {   'titulo':'2001, Odisea en el espacio',
            'director':'Stanley Kubrick',
            'genero': 'ciencia ficción',
            'year':'1976'},
        {   'titulo':'La guerra de las galaxias',
            'director':'George Lucas',
            'genero': 'ciencia ficción',
            'year':'1977'},
        {   'titulo':'La vida de Brian',
            'director':'Monty Phyton',
            'genero': 'Comedia',
            'year':'1980'}
    ];

    return peliculas;
}

function vaciarSelect() {
    let select = document.getElementById("ciudades");
    // varias formas:

    //select.innerHTML = "";

    //podemos pedirle a un nodo que borre a uno de sus hijos:
    //nodoPadre.removeChild(nodoHijo);

    // a un hijo le preguntamos cuál es su padre:
    // nodoHijo.parentNode.removeChild(nodoHijo);

    // y otra opción:
    // nodoHijo.remove();

    let options = select.childNodes;
    let tam = options.length;
    for(let i = 0; i < tam; i++){
        let opcion = options[0]; // para que siempre borre el primero
        opcion.remove();
        // select.removeChild(options[i]);
    }


}

window.onload = function() {
   /*
    document.getElementById("btn_documentWrite").onclick = documentWrite;
    document.getElementById("btn_innerHTML").onclick = _innerHTML;
    document.getElementById("btn_vaciarInnerHTML").onclick = vaciarinnerHTML;
    document.getElementById("btn_crearNodos").onclick = crearNodos;
    document.getElementById("btn_vaciarSelect").onclick = vaciarSelect;
    */
   let input = document.getElementsByTagName('input');
   for(let i = 0; i < input.length; i++){
       let nodo = input[i];
       let id = nodo.id;
       if(id.startsWith('btn_')){
           let nombreFuncion = id.split("_")[1]; // con [1] pedimos la seguna posición del array devuelto
           nodo.onclick = window[nombreFuncion];
       }
   }
   
}

