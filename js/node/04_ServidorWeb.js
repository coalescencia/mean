let fs = require('fs');
let http = require('http');

let servidor = http.createServer(function(request, response) {

    let metodo = request.method;

    if(metodo.toUpperCase() != 'GET') {
        crearError(405, response);
       /*  response.writeHead(405,{'content-type' : 'text/html ; charset=UTF-8'});
        response.end("<h1>405</h1> <h2>Sólo aceptamos peticiones GET</h2>"); */
        return;
    } 
    leerRecursoEstatico(request, response);

});

servidor.listen(3000);


function leerRecursoEstatico(request, response) {

    let recurso = request.url;    
    let extension = recurso.split(".")[1];

    if(typeof extension == 'undefined'){
        crearError(400, response);
       /*  response.writeHead(400,{'content-type' : 'text/html ; charset=UTF-8'});
        response.end("<h1>400</h1> <h2>Petición incorrecta</h2>"); */
        return;
    }

    fs.readFile("./ficheros"+recurso, function(error, data){
        // si todo va bien error es null
       
        if(error != null) {
            for(propiedad in error) {
                console.log("============================");
                console.log(error[propiedad]);
            }
            crearError(404, response);
            /* response.writeHead(404,{'content-type' : 'text/html ; charset=UTF-8'});
            response.end("<h1>404</h1> <h2>No se encontró el recurso</h2>"); */
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