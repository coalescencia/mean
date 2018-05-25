var numero = 54;
var texto = 'esto es una cadena';
var activo = true;
// para transpilar existe un comando: tsc nombre_de_fichero
// string de array:
var palabras = ['hola', 'buenas', 'que tal'];
var algo = "una cosa";
// dos formas de declarar tipo de array:
var lista = [1, 2, 3];
var list = [1, 2, 3];
// tuplas:
// Declare a tuple type
var x;
// Initialize it
x = ["hello", 10]; // OK
console.log(x[0].substr(1));
// funciones:
function saludar() {
    console.log("hola buenas");
}
saludar();
function sumar(n, m) {
    return n + m;
}
var rs = sumar(4, 5);
console.log(rs);
