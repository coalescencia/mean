let fs = require('fs');
let http = require('http');
let negocioPeliculas = require("./05_NegocioPeliculas.js");

let servidor = http.createServer(function(request, response) {
    let metodo = request.method.toUpperCase();
    let recurso = request.url;

    //GET peliculas
    if(metodo == 'GET' && recurso == '/peliculas') {
        listarPeliculas(request, response);     
    //GET peliculas/{id}   
    } else if(metodo == 'GET' && recurso.match("^/peliculas/[0-9]+$") != null ) {
       
        buscarPelicula(request, response);
        

   //POST peliculas - guardar     
    } else if(metodo == 'POST' && recurso == '/peliculas') {
        insertarPelicula(request, response);

    //PUT peliculas - modificar (sustituye un recurso por otro, PATCH modifica el recurso)   
    } else if(metodo == 'PUT' && recurso.match("^/peliculas/[0-9]+$") != null) {
        modificarPelicula(request, response);
        
   //DELETE peliculas/{id}
    } else if(metodo == 'DELETE' && recurso.match("^/peliculas/[0-9]+$") != null) {
        borrarPelicula(request, response);
        
    } else {  
        leerRecursoEstatico(request, response);
    }

});

servidor.listen(4000);


function leerRecursoEstatico(request, response) {
    
console.log("asdfasdf");

    if(request.method.toUpperCase() != 'GET') {
        crearError(405, response);
        return;
    }

    let recurso = request.url;    
    let extension = recurso.split(".")[1];

    if(typeof extension == 'undefined'){
        crearError(400, response);
        return;
    }

    fs.readFile("./05_RecursosEstaticos"+recurso, function(error, data){
        // si todo va bien error es null
       
        if(error != null) {
            for(propiedad in error) {
                console.log("============================");
                console.log(error[propiedad]);
            }
            crearError(404, response);
            return;
        }

        let contentType = '';
        switch(extension) {
            case 'html': contentType = 'text/html ; charset=UTF-8';
                         break;
            case 'css': contentType = 'text/css';
                         break;
            case 'js': contentType = 'text/javascript';
                         break;
            case 'txt': contentType = 'text/plain';
                         break;                                        
        }

        response.writeHead(200,{'content-type' : contentType} );
        response.end(data.toString());
    });

}

function crearError(codigo, response){
    response.writeHead(codigo,{'content-type' : 'text/html ; charset=UTF-8'});
    let html = `<h1>${codigo}</h1>`;
    switch(codigo) {
        case 405: html = `${html} <h2>Sólo aceptamos peticiones GET</h2> `;
                break;
        case 400: html = `${html} <h2>Petición incorrecta</h2> `;
                break;
        case 404: html = `${html} <h2>Recurso no encontrado</h2> `;
                break;
    }
   response.end(html);
}


//////////////////////////////////////////////////////////////////////////////
/// LÓGICA DE CONTROL DEL SERVICIO REST
//////////////////////////////////////////////////////////////////////////////

function listarPeliculas(request, response) {
    let peliculas = negocioPeliculas.listar();
    response.writeHead(200, {'content-type': 'application/json'});
    response.end(JSON.stringify(peliculas));
}

function insertarPelicula(request, response) {
    console.log("insertar pelicula");

    // evento que se ejecuta cuando se ha completado de leer el body
    // body es un objeto buffer
    // data son los valores que nos llegan del formulario
    // body es lo que le pasemos en el request
    // todo esto es asíncrono
    request.on('data', function(body) {
        console.log(body.toString());
        let pelicula = JSON.parse(body.toString());
        let mensaje = negocioPeliculas.insertar(pelicula);
        if(mensaje == "OK") {
            response.writeHead(201, { 'content-type': 'text/plain'});
            response.end("Película insertada correctamente");
        } else {
            response.writeHead(400, { 'content-type': 'text/plain'});
            response.end(mensaje);
        }
    });

    console.log("YAAA, porque esto es asíncrono");

}

function buscarPelicula(request, response) {
    let recurso = request.url;
    let id = recurso.split("/")[2];
    let pelicula = negocioPeliculas.buscar(id);
     // usamos expresiones regulares:
     // let vector = recurso.split("/");
    // let id = vector[vector.length-1];
    //  console.log(id);

    if(pelicula != null) {
        response.writeHead(200, { 'content-type': 'application/json'});
        response.end(JSON.stringify(pelicula));
    } else {
        response.writeHead(404, { 'content-type': 'text/plain'});
        response.end("La película no existe");
    }
}

function modificarPelicula(request, response) {
    let recurso = request.url;
    console.log(recurso);
    let id = recurso.split("/")[2];
   
    request.on('data', function(body) {
        console.log(body.toString());
        let pelicula = JSON.parse(body.toString());
        pelicula.id = id;
        let mensaje = negocioPeliculas.modificar(pelicula);
        if(mensaje == "OK") {
            response.writeHead(201, { 'content-type': 'text/plain'});
            response.end("Película modificada correctamente");
        } else {
            response.writeHead(400, { 'content-type': 'text/plain'});
            response.end(mensaje);
        }
    });
}

function borrarPelicula(request, response) {
    let recurso = request.url.split("/")[2];
    let mensaje = negocioPeliculas.borrar(recurso);
    if(mensaje == "OK") {
        response.writeHead(200, { 'content-type': 'application/plain'});
        response.end("La película se ELIMINÓ correctamente");
    } else {
        response.writeHead(404, { 'content-type': 'text/plain'});
        response.end(mensaje);
    }
}