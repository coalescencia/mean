
let negocioPeliculas = require("./05_NegocioPeliculas.js");
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();

app.use(express.static('./06_RecursosEstaticos'));

app.use(bodyParser.json());

// petición get sin indicar recurso:
app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname + '/06_RecursosEstaticos/listadoPeliculas.html'));
});
app.get("/peliculas", listarPeliculas);
app.get("/peliculas/:idPelicula", buscarPelicula);
app.post("/peliculas", insertarPelicula);
app.put("/peliculas/:idPelicla", modificarPelicula);
app.delete("/peliculas/:idPelicula", borrarPelicula);

app.listen(7000, function() {console.log("esperando peticiones..." )}); 



//////////////////////////////////////////////////////////////////////////////
/// LÓGICA DE CONTROL DEL SERVICIO REST
//////////////////////////////////////////////////////////////////////////////

function listarPeliculas(request, response) {
    let peliculas = negocioPeliculas.listar();
    response.json(peliculas);   
}

function insertarPelicula(request, response) {
  
    let pelicula = request.body;
    let mensaje = negocioPeliculas.insertar(pelicula);
    if(mensaje == "OK") {
        response.status(201);
        response.send("La película se insertó correctamente");       
    } else {
        response.status(400);
        response.send(mensaje);       
    } 
}

function buscarPelicula(request, response) {
    let id = request.params.id;
    let pelicula = negocioPeliculas.buscar(id);
  
    if(pelicula != null) {      
        response.json(pelicula);
    } else {
        response.status(404);
        response.send("La película no existe");
    }
}

function modificarPelicula(request, response) {
    let id = request.params.idPelicula;
    let pelicula = request.body;
    pelicula.id = id;
    let mensaje = negocioPeliculas.modificar(pelicula);
    if(mensaje == "OK") {        
        response.send("Película modificada correctamente");
    } else {
        response.status(400);
        response.send(mensaje);
    }    
}

function borrarPelicula(request, response) {
    let id = request.params.idPelicula;
    let mensaje = negocioPeliculas.borrar(id);
    if(mensaje == "OK") {        
        response.send("La película se ELIMINÓ correctamente");
    } else {
        response.status(404);
        response.end(mensaje);
    }
}
    