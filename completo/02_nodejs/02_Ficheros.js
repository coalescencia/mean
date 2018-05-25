let fs = require("fs");

console.log("=====================");

//Lectura síncrona de ficheros
//Devuelve un objeto buffer
let contenido = fs.readFileSync("./ficheros/datos.txt");
console.log(contenido.toString());

console.log("=====================");
fs.readFile("./ficheros/datos.txt", function(error, data){
    console.log(data.toString());
});









