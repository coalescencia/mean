let peliculas = [];
let contador = 3;

// agregamos unas películas:
peliculas.push({'id': 1,
                'titulo': 'peli 1',
                'director': 'Polanski',
                'genero': 'Accion',
                'year': '1987'});
peliculas.push({'id': 2,
                'titulo': 'otra peli',
                'director': 'Bertolucci',
                'genero': 'Drama',
                'year': '1977'});
peliculas.push({'id': 3,
                'titulo': 'la tercera pelicula',
                'director': 'Wody Allen',
                'genero': 'Comedia',
                'year': '1982'});

exports.listar = function() {
    return peliculas;
}

exports.buscar = function(id) {
    for(let i = 0; i < peliculas.length; i++) {
        let pelicula = peliculas[i]; 
        if(pelicula.id == id) {
            return pelicula;
        }
    }
    return null;
}

exports.insertar = function(pelicula) {

    if(pelicula.titulo.trim() == '') {
        return "Título obligatorio";
    }

    contador++;
    pelicula.id = contador;
    peliculas.push(pelicula);
    return "OK";
}

exports.modificar = function(pelicula) {
    if(pelicula.titulo.trim() == '') {
        return "Título obligatorio";
    }
  
    for(let i = 0; i < peliculas.length; i++){
        if(peliculas[i].id == pelicula.id) {
            peliculas[i] = pelicula;
            return "OK";
            // peliculas[pelicula.id] = pelicula;
        }
    }
    return "La película no existe";    
}

exports.borrar = function(id) {
    for(let i=0; i<peliculas.length; i++) {
        if(peliculas[i].id == id) {
            peliculas.splice(i,1);
            return "OK";
        }
    }
    return " La película que intenta borrar no existe.";
}