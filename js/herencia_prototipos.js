function Persona(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
}

Persona.prototype.saludar = function() {
    return `Hola qué tal ${this.nombre} ${this.apellido}`;
}

const persona1 = new Persona('Maria', 'Molina');
console.log(persona1.saludar());

function Cliente(nombre, apellido, telefono, miembro) {
    //herencia:
    Persona.call(this, nombre, apellido);

    this.telefono = telefono; 
    this.miembro = miembro;
}

// heredar los métodos del prototipo de Persona
Cliente.prototype = Object.create(Persona.prototype);

//hacer que cliente.prototipo retorne Cliente()
Cliente.prototype.constructor = Cliente;

Cliente.prototype.charlar = function() {
    return `estamos charlando, ¿verdad ${this.nombre}?`;
}

const cliente1 = new Cliente('Tomas', 'Medina', '84485573', 'platinum');

console.log(cliente1); 
console.log(cliente1.saludar());
console.log(cliente1.charlar());

console.log("============== Usando Object.create =================");

const PersonaPrototipos = {
    saludar: function() {
        return `Hola qué tal ${this.nombre} ${this.apellido}`; 
    }, 
    getEstado: function(newApellido) {
        this.apellido = newApellido;
    }
}

const pepa = Object.create(PersonaPrototipos);
pepa.nombre = 'Pepa';
pepa.apellido = 'Gòmez';
pepa.edad = 20;

pepa.getEstado('Salvador');

console.log(pepa.saludar());

const sergio = Object.create(PersonaPrototipos, {
    nombre: {value: 'Sergio'},
    apellido: {value: 'Ramirez'},
    edad: { value: 34}
});

console.log(sergio);
sergio.getEstado('Sen');
console.log(sergio.saludar());
// muestra sergio Ramirez y no Sergio Sen, porque la función
//getEstado es del prototipo "heredado" pero como le pasamos 
// un objeto también a Object.create usará los valores de éste
// y sólo si no existe el valor en este objeto usará el del prototipo