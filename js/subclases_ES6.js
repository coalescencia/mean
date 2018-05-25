class Persona {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
       
    }

    saludar() {
        return `Hola qué tal ${this.nombre} ${this.apellido}`;
    }
    static algoPersona() {
        return 100;
    }
}

class Cliente extends Persona {
    constructor(nombre, apellido,telefono, miembro) {
        super(nombre, apellido);

        this.telefono = telefono;
        this.miembro = miembro;
    }

    static getCosteMiembro() {
        return 500;
    }
}

const jose = new Cliente('jose', 'Dyer', '4395440', 'platinum');

console.log(jose);

console.log(jose.saludar());
console.log(Cliente.getCosteMiembro());
console.log(Cliente.algoPersona());