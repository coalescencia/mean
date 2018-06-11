
let peliculas = [];
let contador  = 3;

//Añadimos unas películas
peliculas.push ( { 'id'       : 1,
                   'titulo'   : 'Die Hard',
                   'director' : 'John McTiernan',
                   'genero'   : 'Accion',
                   'year'     : 1989 } );
peliculas.push ( { 'id'       : 2,
                   'titulo'   : 'Harry el sucio',
                   'director' : 'Don Siegel',
                   'genero'   : 'Accion',
                   'year'     : 1972 } );
peliculas.push ( { 'id'       : 3,
                   'titulo'   : 'Don erre que erre',
                   'director' : 'J.L. Saenz de Heredia',
                   'genero'   : 'Comedia',
                   'year'     : 1970 } );


exports.listar = function(){
    return peliculas;
}

exports.buscar = function(id){
    for(let a=0; a<peliculas.length; a++){
        let pelicula = peliculas[a];
        if( pelicula.id == id){
            return pelicula;
        }
    }
    return null;
}

exports.insertar = function(pelicula){
    
    if(!pelicula.titulo || pelicula.titulo.trim() == ''){
        return "Título obligatorio";
    }   
    
    contador++;
    pelicula.id = contador;
    peliculas.push(pelicula);
    return "OK";
}

exports.modificar = function(pelicula){
    if(!pelicula.titulo || pelicula.titulo.trim() == ''){
        return "Título obligatorio";
    }   

    for(let a=0; a<peliculas.length; a++){
        let pAux = peliculas[a];
        if( pAux.id == pelicula.id ){
            peliculas[a] = pelicula;
            return "OK";
        }
    }
    return "La película no existe";
}

exports.borrar = function(id){
    for(let a=0; a<peliculas.length; a++){
        if(peliculas[a].id == id){
            peliculas.splice(a,1);
            return "OK";
        }
    }
    return "La película no existe";
}


