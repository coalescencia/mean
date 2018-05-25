
interface Coche {
    marca:string,
    modelo:string,
    potencia:number
}
//Ya podemos declarar variables del tipo 'Coche'
let coche1:Coche = {
    marca    : 'Citroën',
    modelo   : 'Ami8',
    potencia : 40
};

function insertarCoche(coche:Coche):void{
    console.log("Insertando el coche:"+coche);
}

insertarCoche(coche1);

let coche2 = {
    marca    : 'SEAT',
    modelo   : 'Panda',
    potencia : 40
}
insertarCoche(coche2);
