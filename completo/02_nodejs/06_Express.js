let express = require("express");

let app = express();

console.log("Inicializando");
app.listen(5000, function(){ console.log('Esperando peticiones...') } );

app.use(express.static('06_RecursosEstaticos'));

//Petición get sin indicar recurso
//app.get('/', function(request, response){
//    response.send("<marquee><h2><font color='lightGreen'>Inicio</font></h2></marquee>");
//});
//Lo mismo, pero enviando un fichero
let path = require('path');
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/06_RecursosEstaticos/listadoPeliculas.html'));
});


//Peticion get que recibe parámetros (?)
app.get('/sumar', function(request, response){
    //Accedemos a los parámetros con la propiedad 'query' del objeto request
    let sumando1 = +request.query.s1;
    let sumando2 = +request.query.s2;
    response.send('La suma es: '+(sumando1+sumando2));
    //response.send('La suma es: '+(sumando1*1+sumando2*1));
    //response.send('La suma es: '+(parseInt(sumando1)+parseInt(sumando2)));
});

//Peticion que recibe parámetros en la url
app.get('/peliculas/directores/:idDirector/generos/:idGenero', function(request, response){
    let idDirector = request.params.idDirector;
    let idGenero   = request.params.idGenero;
    response.send("Peliculas del director "+idDirector+" y del genero "+idGenero);
});

//Obteniendo el body
let bodyParser = require('body-parser');
let bp = bodyParser.json();
app.use(bp);

app.post('/peliculas', function(request, response){
    let pelicula = request.body;
    console.log("Insertando la pelicula: "+pelicula.titulo+","+pelicula.director);
    response.status(201);
});

//Colocando un json en la respuesta
app.get("/coches/:idCoche", function(request, response){
    let id = request.params.idCoche;

    let coche = { marca     : 'Ferrari',
                  modelo    : 'F-40',
                  matricula : 'M-1245-XX' };

    //response.writeHead(200, { 'content-type' : 'application/json' });
    //response.end(JSON.stringify(coche));   
    
    response.json(coche);

});

