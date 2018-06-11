
function subscribe(exito, fallo, siempre){
    //
    //se envía la petición ajax...
    //
    let datos = '{ "nombre":"Bart" }';
    exito(datos);

    let error = '{ "status":"400", "mensaje":"catapún"}';
    fallo(error);

    siempre();
}

console.log("==========================");
subscribe(function(datos){
            console.log(JSON.parse(datos));
          },
          function(error){
            console.error(JSON.parse(error));
          },
          function(){
            console.log("YA");
          });

console.log("==========================");
subscribe(datos => console.log(JSON.parse(datos)),
          error => console.error(JSON.parse(error)),
          () => console.log("YA"));


//Si la funcion solo recibe un parámetro no hace falta colocar los parentesis
//Si la función no recibe parámetros es obligatorio colocar los parentesis  
//Si la función recibe más de un parámetro los parentesis son obligatorios

//Si el cuerpo de la función sólo tiene una línea no es necesario colocar las llaves

let f1a = function(datos){
    console.log(JSON.parse(datos));
}
let f1b = datos => console.log(JSON.parse(datos));

let f2a = function(){
    console.log("YA");
}
let f2b = () => console.log("YA");


//Return
console.log("==========================");

function crearCodigoFactura(formatear){
    //Obtener el número de la factura
    let numero = 101;
    
    let codigo = formatear(numero);
    return codigo;
}

let f3a = function(numero){
    return "FAC-"+numero;
}

//si el cuerpo de la función tiene solo una línea el RETURN va implícito
//si la función tiene más de una línea ya tenemos que colocar las llaves
//y si el return es necesario se debe escribir explícitamente
//let f3b = numero => return "FAC-"+numero; Error sintáctico
let f3b = numero => "FAC-"+numero;

let codigo = crearCodigoFactura(f3b);
console.log(codigo);

//
//this en expresiones lambda
//
console.log("==========================");
let persona = { nombre : 'Venancio',
                saludar : funcion1 }

function funcion1(){
    //Aqui this es el objeto al que se le asigna 'funcion1' como valor
    //de una propiedad
    console.log(this.nombre); //Aqui this es 'persona'
    let that = this;

    let fa = function(){
        //Dentro de esta funcion 'this' no es el mismo que en la funcion
        //'funcion1' y por eso usamos (entre otras posibilidades) el 
        //truco del 'that'
        console.log(that.nombre); //Venancio
        console.log(this.nombre); //undefined
    }

    //Dentro de una expresión lambda 'this' tiene el mismo valor
    //que el de la funcion que la contiene
    //Con expresiones lambda nos ahoramos el truqui del 'that'
    let fb = () => {
        console.log(that.nombre); //Venancio
        console.log(this.nombre); //Venancio
    }

    console.log("------------------");
    fa();
    console.log("------------------");
    fb();
}

persona.saludar();



















