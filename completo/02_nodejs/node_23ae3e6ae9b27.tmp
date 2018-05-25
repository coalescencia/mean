let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let negocioPeliculas = require('./05_NegocioPeliculas.js');

let app = express();

app.use(express.static('07_RecursosEstaticos'));
app.use(bodyParser.json());
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/07_RecursosEstaticos/listadoPeliculas.html'));
});
app.get('/peliculas', listarPeliculas);
app.get('/peliculas/:idPelicula', buscarPelicula);
app.post('/peliculas', insertarPelicula);
app.put("/peliculas/:idPelicula", modificarPelicula);
app.delete("/peliculas/:idPelicula", borrarPelicula);

app.listen(7000, function(){ console.log('Esperando peticiones...') } );

function listarPeliculas(request, response){
    let peliculas = negocioPeliculas.listar();
    response.json(peliculas);
}

function insertarPelicula(request, response){
    let pelicula = request.body;
    let mensaje = negocioPeliculas.insertar(pelicula);
    if(mensaje == 'OK'){
        response.status(201);
        response.send("La película se insertó correctamente");
    } else {
        response.status(400);
        response.send(mensaje);
    }
}

function modificarPelicula(request, response){

    let id = request.params.idPelicula;
    let pelicula = request.body;
    pelicula.id = id; //<-----
    let mensaje = negocioPeliculas.modificar(pelicula);
    if(mensaje == 'OK'){
        response.send("La película se modificó correctamente");
    } else {
        response.status(400);
        response.send(mensaje); 
    }
}

function buscarPelicula(request, response){
    let pelicula = negocioPeliculas.buscar(request.params.idPelicula);
    if(pelicula != null){
        response.json(pelicula);        
    } else {
        response.status(404);
        response.send("La película no existe");        
    }
}

function borrarPelicula(request, response){
    let mensaje = negocioPeliculas.borrar(request.params.idPelicula);
    if(mensaje == 'OK'){
        response.send("La película se eliminó correctamente");        
    } else {
        response.status(404);
        response.send(mensaje);        
    }
}

