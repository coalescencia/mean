
class Barco {

    //Atributos/identidad/estado/variables de clase/variables miembro/campos
    public    nombre:string;
    protected eslora:number;
    private   trb   :number;

    //Solo podemos tener un constructor y debe llamarse 'constructor'
    constructor(nombre:string, eslora:number, trb:number){
        console.log("Instanciando un barco");
        this.nombre = nombre;
        this.setEslora(eslora); //Para no repetir la validacion
        this.trb = trb;
    }

    public setEslora(eslora:number):void{
        if(eslora<=0){
            return;
        }
        this.eslora = eslora;
    }

    public getEslora():number{
        return this.eslora;
    }

    public toString():string{
        return this.nombre+", "+this.eslora+", "+this.trb;
    }

}

//
//Herencia
//
class Portaaviones extends Barco {
    public aeronaves:number;

    constructor(nombre:string, eslora:number, trb:number, aeronaves:number){
        //Cascada de constructores
        super(nombre, eslora, trb); 
        this.aeronaves = aeronaves;        
    }

    public toString():string{
        return super.toString()+", "+this.aeronaves;
    }

}

let barco1:Barco = new Barco('Calypso',70,300);
//barco1.nombre = '';
//barco1.eslora = 40;
//barco1.trb = -100;
console.log(barco1.toString());

let nimitz:Portaaviones = new Portaaviones('USS Nimitz',330,100000,100);
console.log(nimitz.toString());

//
//Declarando los atributos en el CONSTRUCTOR
//
class Persona {

    //public nombre:string;
    //public direccion:string;
    //public telefono:string;

    constructor(public nombre:string, public direccion:string, public telefono:string){
        //this.nombre    = nombre;
        //this.direccion = direccion;
        //this.telefono  = telefono;
    }

}