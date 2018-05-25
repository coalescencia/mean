let fs = require('fs');

// SÍNCRONO:
/* let data = fs.readFileSync("ficheros/fichero1.txt");
let segundoFichero = data.toString();

data = fs.readFileSync("ficheros/"+segundoFichero);
let tercerFichero = data.toString();

data = fs.readFileSync("ficheros/"+ tercerFichero);

console.log(data.toString());
 */


// haciéndolo ASÍNCRONA:
let txt = 'inicio';
fs.readFile("ficheros/fichero1.txt", function(error, data){
    let segundoFichero = data.toString();
    txt = 'primer';
    fs.readFile("ficheros/"+segundoFichero, function(error, data){
        let tercerFichero = data.toString();
        txt = 'segund';
        fs.readFile("ficheros/"+tercerFichero, function(error, data){
            console.log(data.toString());
            txt = 'tercero';
            console.log(txt);
        });
    });
});
console.log(txt);


