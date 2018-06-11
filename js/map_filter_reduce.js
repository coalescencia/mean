

// https://code.tutsplus.com/es/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209

var tasks = [
     {
      'name'     : 'Write for Envato Tuts+',   
      'duration' : 120   
    },   
    {   
      'name'     : 'Work out',   
      'duration' : 60   
    },   
    {   
      'name'     : 'Procrastinate on Duolingo',   
      'duration' : 240   
    }   
  ];

  //////////////////    /////////////////////////
  /*                MAP                      */
  /////////////////////////////////////////////

  /* Digamos que queremos crear un nuevo array con solo el nombre de cada tarea, entonces podemos darle una mirada a todo lo que hemos hecho en el día. 
  Usando un ciclo for, escribiríamos algo como esto: */
  // var task_names = [];

/* for (var i = 0, max = tasks.length; i < max; i += 1) { 
    task_names.push(tasks[i].name); 
} */

/* javaScript también ofrece un ciclo forEach Este funciona como un for, pero maneja por nosotros todo el desorden de revisar en cada iteracion el
 indice contra la longitud del array. */
 
/* tasks.forEach(function (task) { 
    task_names.push(task.name);     
}); */
/* 
Usando map podemos escribir */
/* var task_names = tasks.map(function (task, index, array) {  // los parámetros index y array son opcionales
    return task.name; 
 });
 console.log(task_names); */
 
 // o aún más corto:
 var task_names = tasks.map((task) => task.name );
 // la función flecha permite omitir la palabra return
 console.log(task_names);

 
   /*  El callback que pasas al map debe tener una setencia return específica o el map devolverá un array lleno de undefined. No es dificil recordar incluir
    un valor return, pero  no es dificil olvidarlo.    
    Afortunadamente, este es el única sorpresa con map. Pero es una falla bastante común que estoy obligado a enfatizar: ¡Asegúrese siempre de 
    que su devolución de llamada contenga la declaración return! */

   

    
  //////////////////    /////////////////////////
  /*                FILTER                      */
  ///////////////////////////////////////////////

  // toma una array, y filtra los elementos no deseados,
 //  devuelve un nuevo array que contiene sólo los elementos para los que la devolución de llamada devuelve true.

 var difficult_tasks = tasks.filter(function (task) {
       return task.duration >= 120;
});

console.log(difficult_tasks);
 
// Using ES6
// var difficult_tasks = tasks.filter((task) => task.duration >= 120 );


  //////////////////    /////////////////////////
  /*                REDUCE                      */
  ///////////////////////////////////////////////

// por otro lado, toma todos los elementos en un array, y los reduce en un solo valor.

