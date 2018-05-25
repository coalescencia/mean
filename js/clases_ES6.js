class Persona {
    constructor(nombre, apellido, cumple) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cumple = new Date(cumple);
    }

    saludar() {
        return `Hola qué tal ${this.nombre} ${this.apellido}`;
    }

    calcularEdad() {
        const diff = Date.now() - this.cumple.getTime(); 
        const datoEdad = new Date(diff);
        return Math.abs(datoEdad.getUTCFullYear() - 1970);
    }

    getNewApellido(newApellido) {
        this.apellido = newApellido;
    }

    static sumar(x,y) {
        return x + y;
    }
}

const pepa = new Persona('Pepa', 'Sánchez', '11-13-1980');
// en firefox no funciona, en chrome sí

console.log(pepa);
console.log(pepa.calcularEdad());
pepa.getNewApellido('Thompson');
console.log(pepa);
console.log(Persona.sumar(4,5));