
let http = require('http');

console.log("buenas qué tal");

/* let server = http.createServer(function(){
    console.log("funciona servidor");
});

server.listen(2000); */

http.createServer(function(peticion, respuesta){
    console.log("funciona servidor");
    
    //configuramos la cabecera de la respuesta. La respuesta que nos envían viene en blanco para que la rellenemos desde aquí
    respuesta.writeHead(200, {'content-type' : 'text/html; charset=UTF-8'});
   
    let datos = [10,20,30,40,50,60];

    let html = `<html>
                <head></head>
                <body>
                <h1>Respuesta generada desde el servidor </h1>
                <table border=1>
              `;
    
    for(let i = 0; i < datos.length; i++) {
       html = `${html}<tr><td> ${datos[i]} </td></tr>`;
    }
    
    html = `${html}</table> </body></html>`;

    respuesta.end(html);
        
   
}).listen(2000); 