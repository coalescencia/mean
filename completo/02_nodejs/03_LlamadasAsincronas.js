let fs = require('fs');

//
//
//
console.log("========================");
let data = fs.readFileSync("./ficheros/fichero1.txt");
let segundoFichero = data.toString();

data = fs.readFileSync("./ficheros/"+segundoFichero);
let tercerFichero = data.toString();

data = fs.readFileSync("./ficheros/"+tercerFichero);
console.log(data.toString());

console.log("========================");
//Aqui tenemos un ejemplo de callback hell que lo ves y gritas 'help!'
fs.readFile("./ficheros/fichero1.txt", function(error, data){
    let segundoFichero = data.toString();
    fs.readFile("./ficheros/"+segundoFichero, function(error,data){
        let tercerFichero = data.toString();
        fs.readFile("./ficheros/"+tercerFichero, function(error, data){
            console.log(data.toString());
            txt = data.toString();
        });
    });
});

console.log("========================");

fs.writeFile("f1.txt", "MOVIDA 1", function(){
    console.log("F1 escrito");
})
fs.writeFile("f2.txt", "MOVIDA 2", function(){
    console.log("F2 escrito");
})
fs.writeFile("f3.txt", "MOVIDA 3", function(){
    console.log("F3 escrito");
})

