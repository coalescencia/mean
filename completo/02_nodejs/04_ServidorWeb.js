let fs = require('fs');
let http = require('http');

let servidor = http.createServer(function(request, response){
    let metodo = request.method;
    console.log("Peticion recibida:"+request.url);

    if( metodo.toUpperCase() != 'GET' ){
        crearError(405, response);
        return;
    } 
    
    leerRecursoEstatico(request, response);
});
servidor.listen(3000);

function leerRecursoEstatico(request, response){

    let recurso = request.url;

    let extension = recurso.split(".")[1];
    if( typeof extension == 'undefined' ){
        crearError(400, response);
        return;
    }

    fs.readFile("./ficheros"+recurso, function(error, data){

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





