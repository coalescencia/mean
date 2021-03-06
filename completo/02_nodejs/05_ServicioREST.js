let fs = require('fs');
let http = require('http');
let negocioPeliculas = require('./05_NegocioPeliculas.js');

//
//CREAMOS EL SERVIDOR
//
let servidor = http.createServer(function(request, response){
    let metodo  = request.method.toUpperCase();
    let recurso = request.url;
    console.log("Peticion recibida:"+request.url);

    if( metodo == 'GET' && recurso == '/peliculas' ){
        listarPeliculas(request, response);       
    } else if( metodo == 'GET' && recurso.match("^/peliculas/[0-9]+$")!=null ){
        buscarPelicula(request, response);
    } else if( metodo == 'POST' && recurso == '/peliculas' ){
        insertarPelicula(request, response);
    } else if( metodo == 'PUT' && recurso.match("^/peliculas/[0-9]+$")!=null ){
        modificarPelicula(request, response);
    } else if( metodo == 'DELETE' && recurso.match("^/peliculas/[0-9]+$")!=null ) {
        borrarPelicula(request, response);    
    } else {
        leerRecursoEstatico(request, response);
    }

});
servidor.listen(4000);

//
//Función para entregar contenido estático
//
function leerRecursoEstatico(request, response){
    
    if( request.method.toUpperCase() != 'GET' ){
        crearError(405, response);
        return;
    } 
    let recurso = request.url;

    let extension = recurso.split(".")[1];
    if( typeof extension == 'undefined' ){
        crearError(400, response);
        return;
    }

    fs.readFile("./05_RecursosEstaticos"+recurso, function(error, data){
        if( error != null ){
            crearError(404, response);
            return;
        }        
                
        let contentType = '';
        switch(extension){
            case 'html' : contentType = 'text/html';
                          break;
            case 'css'  : contentType = 'text/css';
                          break;
            case 'js'   : contentType = 'text/javascript';
                          break;
            case 'txt'  : contentType = 'text/plain';
                          break;
        }
        response.writeHead(200, { 'content-type' : contentType });
        response.end(data.toString());
    });
}

//
//Funcion para crear un error como respuesta 
//
function crearError(codigo, response){

    response.writeHead(codigo, { 'content-type' : 'text/html' });

    let html = "<h1>"+codigo+"</h1>";
    switch(codigo){
        case 405 : html = html+"<h2>Solo aceptamos peticiones GET</h2>";
                   break;
        case 400 : html = html+"<h2>Peticion incorrecta</h2>";
                   break;
        case 404 : html = html+"<h2>Recurso no encontrado</h2>";
                   break;
    }

    response.end(html);
}

//////////////////////////////////////////////////////////////
//LÓGICA DE CONTROL DEL SERVICIO REST
//////////////////////////////////////////////////////////////

//1-extraer de la petición la informacion necesaria
//2-transformar esa informacion en algo que entienda la lógica de negocio
//3-llamar a la función de negocio adecuada
//4-si la lógica de negocio devuelve algo transformarlo en lo que espera
//  el cliente y colocarlo en el body
//5-si se ha producido un error devolver el mensaje http adecuado

function listarPeliculas(request, response){
    let peliculas = negocioPeliculas.listar();
    response.writeHead(200, { 'content-type' : 'application/json'});
    response.end(JSON.stringify(peliculas));
}

function insertarPelicula(request, response){
    //Leer el body es asíncrono
    request.on('data', function(body){
        console.log(body.toString());
        let pelicula = JSON.parse(body.toString());
        let mensaje = negocioPeliculas.insertar(pelicula);
        if(mensaje == 'OK'){
            response.writeHead(201, { 'content-type' : 'text/plain' });
            response.end("La película se insertó correctamente"); //Deployment Process Management
        } else {
            response.writeHead(400, { 'content-type' : 'text/plain' });
            response.end(mensaje); //Deployment Process Management            
        }
    });
}

function modificarPelicula(request, response){
    let recurso = request.url;
    let id = recurso.split("/")[2];

    request.on('data', function(body){
        console.log(body.toString());
        let pelicula = JSON.parse(body.toString());
        pelicula.id = id; //<-----
        let mensaje = negocioPeliculas.modificar(pelicula);
        if(mensaje == 'OK'){
            response.writeHead(200, { 'content-type' : 'text/plain' });
            response.end("La película se modificó correctamente"); //Deployment Process Management
        } else {
            response.writeHead(400, { 'content-type' : 'text/plain' });
            response.end(mensaje); //Deployment Process Management            
        }
    });
}

function buscarPelicula(request, response){
    let recurso = request.url;
    let id = recurso.split("/")[2];
    let pelicula = negocioPeliculas.buscar(id);

    if(pelicula != null){
        response.writeHead(200, { 'content-type' : 'application/json' });
        response.end(JSON.stringify(pelicula));        
    } else {
        response.writeHead(404, { 'content-type' : 'text/plain; charset=utf-8' });
        response.end("La película no existe");        
    }
}

function borrarPelicula(request, response){
    let id = request.url.split("/")[2];
    let mensaje = negocioPeliculas.borrar(id);

    if(mensaje == 'OK'){
        response.writeHead(200, { 'content-type' : 'text/plain' });
        response.end("La película se eliminó correctamente");        
    } else {
        response.writeHead(404, { 'content-type' : 'text/plain; charset=utf-8' });
        response.end(mensaje);        
    }

}

