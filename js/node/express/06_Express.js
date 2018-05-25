let express = require('express');

let app = express();

// la función que pasamos es opcional, esta funciòn se ejecuta cuando se ha terminado todo de hacer y está escuchando el puerto:
app.listen(5000, function() {console.log("esperando peticiones..." )});  
console.log("ya ..."); // este código se ejecuta antes que la función de arriba.

app.use(express.static('06_RecursosEstaticos'));

// petición get sin indicar recurso:
app.get("/", function(request, response) {
    response.send("<h3>Inicio</h3>");
});

// petición GET que recibe parámetros:
app.get("/sumar", function(request, response) {
    // accedemos a los parámetros con la propiedad 'query' del objeto request
   let sumando1 = request.query.s1;  // podemos poner +request , el + es para que lo parsee como número
   let sumando2 = request.query.s2;
   response.send("La suma es: "+ (parseInt(sumando1) + parseInt(sumando2)));
   // la url sería por ejemplo: http://localhost:5000/sumar?s1=3&s2=4
});

// petición que recibe parámetros en la url, ejemplo peliculas/director :
app.get("/peliculas/directores/:idDirector/generos/:idGenero", function(request, response) {
    let idDirector = request.params.idDirector;
    let idGenero = request.params.idGenero;
    response.send("Películas del director "+ idDirector + " y del género "+ idGenero);
});

// obteniendo el body:
let bodyParser = require('body-parser');
// es un objeto que tiene tantas propiedades como se hayan exportado 
// para todas aquellas peticiones entrantes pidiendo body, lo lee y comprueba si es json, entonces lo transforma:
app.use(bodyParser.json());

app.post("/peliculas", function(request, response){
    let pelicula = request.body;
    console.log("insertando la pelicula: " +pelicula.titulo+" , "+ pelicula.director);
    response.status(201); 
    // para probar: http://localhost:5000/formularioPeliculas.html
});

// colocando un json en la respuesta:
app.get("/coches/:idCoche", function(request, response) {
    let id = request.params.idCoche;
    let coche = { marca : 'citrone',
                  modelo : 'c5',
                  matricula : 'm-3433' };
    response.json(coche);
    // para probar: http://localhost:5000/coches/45
});