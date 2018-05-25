function Cliente() {
    this.nombre = '';
    this.direccion = '';
    this.telefono = '';
}

cliente1 = new Cliente();
console.log(cliente1.nombre);

cliente2 = new Cliente();
cliente2.nombre = "Pepa";
cliente3 = new Cliente();
cliente3.nombre = "Daniel";
console.log(cliente2);
console.log(cliente3);

// agregando funciones a los objetos: 

function Coche(){
    this.marca = null;
    this.modelo = null;
    this.matricula = null;

    this.toString = function() {
        return this.marca + ", "+ this.modelo + ", " + this.matricula;
    }
}

let coche1 = new Coche();
coche1.marca = "Renault";
coche1.modelo = "Express";
coche1.matricula = "3454W";
console.log(coche1.toString());


// añadiendo funciones al objeto usando el prototipo:

function Disco() {
    this.titulo = null;
    this.grupo = null;
    this.year = null;
}

Disco.prototype.toString = function() {
    return this.titulo + ", "+ this.grupo + ", " + this.year;
}

console.log("========================================");

let disco1 = new Disco();
disco1.titulo = "hola";
disco1.grupo = "All time low";
disco1.year = 2012;
console.log(disco1.toString());



console.log("=========================================");

let libro = { 'titulo':' cien años de soledad',
               'saludar': function() {
                   console.log("hola soy: "+ this.titulo);
               }}

console.log(libro.titulo);
libro.saludar();


console.log("=========================================");

function Restaurante(nombre, direccion) {
    this.nombre = nombre;
    this.direccion = direccion;
}

Restaurante.prototype.toString = function() {
    return this.nombre + ", "+ this.direccion;
}

let restaurante1 = new Restaurante("Casa MIngo", "c/ asdfa");
let restaurante2 = new Restaurante("Novades ", "c/ novatilla");
console.log(restaurante1.toString());
console.log(restaurante2.toString());


console.log("========= Funciones 'privadas' =============");

function Ciudad(nombre, poblacion) {
    this.nombre = nombre;
    this.poblacion = poblacion;

    // función pública: 
    this.f1 = function() {
        console.log("función pública");
        privada();
    }

    // función 'privada' :
    function privada() {
        console.log(this.nombre + " es una función privada");
    }
}

let ciudad1 = new Ciudad('Getafe', 140000);
ciudad1.f1();

function Pelicula(titulo,director, y) {
    
    this.titulo = titulo;
    this.director = director;
    if( y < 1900){
        console.log("el año no es válido");
    }

    // atributos privados al no poner el this:
    let year = y;

    this.getYear = function() {
        return year;
    }

    this.setYear = function(y) {
        if(y > 1900) {
            year = y;
        }
    }

}

console.log("========= Modificadores privados: =============");
pelicula1 = new Pelicula("La vida de Brian", "Monty Phyton", 1978);
console.log(pelicula1.titulo);
console.log(pelicula1.getYear());
pelicula1.setYear(2000);
console.log(pelicula1.getYear());


console.log("========= Propiedades estáticas: =============");

function Ordenador(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;

    if(typeof Ordenador.contador == 'undefined'){
        Ordenador.contador = 0;
    }
    Ordenador.contador++;
}

ordenador1 = new Ordenador("HP", "2395-j");
ordenador2 = new Ordenador("IBM", "RT454-yt");
console.log(Ordenador.contador);



