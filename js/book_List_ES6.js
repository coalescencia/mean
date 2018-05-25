class Libro {
    constructor(titulo, autor, isbn){
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;

    }
}


class UI{
    agregarLibroALista(libro) {
        const lista = document.getElementById("book-list");
        const fila = document.createElement('tr');
    
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.isbn}</td>
            <td><a href="#" class="delete">X</a></td>   
        `;

        lista.appendChild(fila);
    }

    mostrarAlerta(alerta, nombreClase) {
        const div = document.createElement('div');
        div.className = `alert ${nombreClase}`;
        div.appendChild(document.createTextNode(alerta));
        // obtener un padre:
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form); // inserta div antes de la etiqueta form
        
        //Timeout 3 seg:
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);    
    }

    borrarLibro(referencia) {
        if(referencia.className === 'delete'){
            referencia.parentElement.parentElement.remove();
        }
    }

    limpiarCampos() {
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store {
    static getLibros() {
        let libros;
        if(localStorage.getItem('libros') === null){
            libros = [];
        } else {
            libros = JSON.parse(localStorage.getItem('libros'));
        }
        return libros;
    }

    static mostrarLibros() {
        const libros = Store.getLibros();

        libros.forEach(function(libro){
            const ui = new UI;
            // Agregamos libro a UI
            ui.agregarLibroALista(libro);
        });
    }

    static agregarLibro(libro) {
        const libros = Store.getLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));
    }

    static borrarLibro(isbn) {
        const libros = Store.getLibros();
        libros.forEach(function(libro, index){
            if(libro.isbn === isbn) {
                libros.splice(index, 1);
            }
        });
        localStorage.setItem('libros', JSON.stringify(libros));
    }
} // fin class Store

// DOM evento de carga de datos del local storage:
// DOMContentLoaded es como load pero no espera a que se carguen hojas de estilo ni imágenes
document.addEventListener('DOMContentLoaded', Store.mostrarLibros);


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

        // almacenar en Local Storage:
        Store.agregarLibro(libro);

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

    // borrar del Local Storage:
    Store.borrarLibro(e.target.parentElement.previousElementSibling.textContent);

    // mostrar mensaje:
    ui.mostrarAlerta("El libro ha sido borrado", 'success');

    e.preventDefault();
})