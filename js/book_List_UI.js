
function Libro(titulo, autor, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

// Agregar libro a la lista
UI.prototype.agregarLibroALista = function(libro) {
    const lista = document.getElementById("book-list");
    // crear elemento tr
    const fila = document.createElement('tr');
    // insertamos columna
    fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.isbn}</td>
        <td><a href="#" class="delete">X</a></td>   
    `;
    
    lista.appendChild(fila);
}

// mostrar alerta:
UI.prototype.mostrarAlerta = function(mensaje, nombreClase){
    const div = document.createElement('div');
    div.className = `alert ${nombreClase}`;
    div.appendChild(document.createTextNode(mensaje));
    // obtener un padre:
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form); // inserta div antes de la etiqueta form
    
    //Timeout 3 seg:
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);    
}

UI.prototype.borrarLibro = function (referencia){
    if(referencia.className === 'delete'){
        referencia.parentElement.parentElement.remove();
    }
}

// limpiar campos
UI.prototype.limpiarCampos = function() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listener para agregar un libro:
document.getElementById('book-form').addEventListener('submit', function(e){    
    const titulo = document.getElementById('titulo').value,
          autor = document.getElementById('autor').value,
          isbn = document.getElementById('isbn').value;
    
    const libro = new Libro(titulo, autor, isbn);

    // instanciamos UI: 
    const ui = new UI();

    console.log(ui);

    // validación:
    if(titulo === '' || autor === '' || isbn === ''){
        // alerta error:
        ui.mostrarAlerta("Por favor rellene todos los campos.", "error");
    }else {

        // agregar libro a la lista:
        ui.agregarLibroALista(libro);

        ui.mostrarAlerta("¡Libro agregado!", 'success');

        // limpiar campos:
        ui.limpiarCampos();
    }

    e.preventDefault();
})

// eventListener para borrar libro:
document.getElementById('book-list').addEventListener('click', function(e){

    const ui = new UI();
    ui.borrarLibro(e.target);

    // mostrar mensaje:
    ui.mostrarAlerta("El libro ha sido borrado", 'success');

    e.preventDefault();
})