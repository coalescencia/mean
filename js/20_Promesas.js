
//
//Una promesa recibe como parámetro una funcion que
//recibe dos parámetros que tambien son funciones
//
let promesa = new Promise( function(resolve, reject){

    //Dentro de la funcion que le pasamos a la promesa colocamos
    //el código que ejecutará una tarea 'asíncronamente'
    //leer un fichero
    //hacer una consulta a la bb.dd.
    //transformar una imagen de un formato a otro
    //ordenar un array
    //matar a un alumno que se resiste a morir y no quieres interrumpir
    //la clase
    //...
    
    for(let a=0; a<100; a++){
        //Hacer cualquier movida
    }
    console.log("YA");

    //Una vez realizada la tarea sabremos si ha tenido éxito o no.
    //(hay tareas que antes o despues terminaran pero que no fallan nunca
    //como por ejemplo ordenar un array)

    //Si tiene éxito invocamos 'resolve'
    //Si falla invocamos 'reject'
    let ok = true;
    if( ok ){
        resolve();
    } else {
        reject();
    }

});

//Usando la promesa una vez creada
promesa.
then(function(){ console.log("OK") }). //La función que pasamos con 'then' será la función 'resolve'
catch(function(){ console.log("ZASCA") });//La función que pasamos con 'catch' será la función 'reject'


///////////////////////////////////////////////////////
//Normalmente las promesas se declaran en una función//
///////////////////////////////////////////////////////
function encontrarMáximo(datos){    
    return new Promise( function(resolve, reject){

        if(!datos || datos.length == 0){
            reject('El array está vacío');
            return;
        }

        let max = Number.MIN_VALUE;
        for(let valor of datos){
            if( valor>max ){
                max = valor;
            }
        }
        resolve(max);
    }); 
}

let promesa2 = encontrarMáximo([-7,-6,-5,-4,-3,-2,-1,0,15000]);
promesa2.
then( function(max){ console.log("El máximo es:"+max)} ).
catch(mostrarError);

let promesa3 = encontrarMáximo([1,2,3,4,5,6,7,8,9]);
promesa3.
then(mostrarMaximo).
catch(mostrarError);

function mostrarMaximo(max){
    console.log("MAX:"+max);
}
function mostrarError(){
    console.log("AYAYAY");
}
