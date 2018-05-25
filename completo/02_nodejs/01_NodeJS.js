let http = require("http");

console.log("HOLA MUNDO");

/*
let server = http.createServer( function(){ 
    console.log("Peticion recibida"); 
} );
server.listen(2000);
*/

http.createServer( function(peticion, respuesta){

    console.log("Peticion recibida"); 

    //Configuramos la cabecera de la respuesta
    respuesta.writeHead(200, { 'content-type' : 'text/html' } );
    
    let datos = [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ];
    let html = "<html>"+
                "<head></head>"+
                "<body>"+
                    "<h1 align='center'>HTML generado en el servidor</h1>"+
                    "<table align='center' border='1'>";
    for(let a=0; a<datos.length; a++){
        html = html +"<tr>"+
                        "<td>"+datos[a]+"</td>"+
                     "</tr>";   
    }

    html = html +"</table>"+
                "</body>"+
                "</html>";

    //Colocamos contenido en el body de la respuesta
    respuesta.end(html);


} ).listen(2000);







