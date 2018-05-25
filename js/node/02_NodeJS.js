// módulo fileSystem, para poder leer y escribir
let fs = require('fs');

console.log("===================================");


// lectura síncrona de ficheros
// devuelve un objeto
let contenido = fs.readFileSync("./datos.txt");
console.log(contenido.toString());


console.log("===================================");
// lectura asíncrona de ficheros
 fs.readFile("./datos.txt",function(error, data){
    console.log(data.toString());
});
 // la función es un callback que se ejecutará cuando se finalice la lectura del fichero

console.log("FIN");

