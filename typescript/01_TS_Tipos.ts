//npm install -g typescript
//tsc 01_TS_Tipos.ts
//node 01_TS_Tipos.js

//
//Typescript es un lenguaje tipado, pero no fuertemente tipado
//
let numero:number = 666;
let texto:string = 'Bart J simpson';
let activo:boolean = true;

//Como typescript se transpila en javascript podemos sin ningun problema 
//definir variables sin indicar el tipo
let noseque = 'nosecuantos';
//Si no queremos indicar el tipo pero queremos hacerlo en plan typescript
let movida:any = 'movidón';

//Arrays
let palabras:string[] = [ 'un','dos','tres','responda','otra', 'vez' ];

//Funciones

//Tipo especial 'void'
function saludar():void{
    console.log("Hola radiola");
}
saludar();

function sumar(s1:number, s2:number):number{
    return s1+s2;
}

let rs:number = sumar(1,2);
console.log(rs);

console.log("FIN");









