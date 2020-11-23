  //Vamos a usar http://processingjs.org/
  // o https://p5js.org/reference/
  // Importamos las librerias
  let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

  function make(data, attribute) {
    return Object.assign({}, data, attribute);
  }
  

  //Hace funcionar el reconocimiento de cada celda en el mapa, si se quita deja de funcionar

  function recursivelist(l, f, index = 0) {
    if (!isEmpty(l)) {
      f(first(l), index);
      recursivelist(rest(l), f, index + 1);
    }
  }
  
  /*
  Contrato: posicion list, number --> number
  Funcionalidad: Permite saber la posicion en el eje X o Y segun el elegido.
  posicion(){Cuerpo de la funcion}
  Ejemplos:
  posicion([1,0,0,0,2,0,3], 4)= 2
  posicion([1,0,0,0,2,0,3],0)= 1
  */
  
  function posicion(lista,y)
  { 
    if(y==0)
    return first(lista);
    else
    return posicion(rest(lista),y-1);
    
  }
  
  /*
    Contrato: calcularPosicionTomb number, number --> structure
    Funcionalidad: Calcula la posicion en cuadricula cuando esta es multiplo de 40.
    calcularPosicionTomb(){Cuerpo de la funcion}
    Ejemplos:
    calcularPosicionTomb([400,520])= [x:10,y:13]
    calcularPosicionTomb([0,40,])= [x:0,y:1]
  */
  
  function calcularPosicionTomb(x,y)
  {
    if(x%40==0){
      auxiliarx= Math.floor(x/40);
      auxiliary= Math.floor(y/40);
    }
    if(y%40==0){
      auxiliarx= Math.floor(x/40);
      auxiliary= Math.floor(y/40);
    }
  
    posicionActualTomb={x:auxiliarx,y:auxiliary}
    return posicionActualTomb;
  }
  
  /*
    Contrato: colisionTomb number, number --> number
    Funcionalidad: Dice el dato en la posicion de la matriz dada, en este caso el mapa en cuestion.
    colisionTomb(){Cuerpo de la funcion}
    Ejemplos:
    colisionTomb([10,13])= 2
    colisionTomb([0,2])= 1
  */

  //Ervin esta funcion te servira para hacer lo de detectar que bloque  hay enfrente, mira las otras veces que la usa natalia o yo, recuerda testear en un fork (un repl.it de pruebas), se usa mas o menos en onTic.

  function colisionTomb(x,y)
  {
    return posicion(posicion(mapa,y),x);
  }

  

  

  /*
    Contrato: recorrerBloques list, number, number --> number
    Funcionalidad: Compara la lista con el dato de la matriz y retorna verdadero si el dato aparece en la lista, y falso si el dato no aparece en la lista.
    recorrerBloques(){Cuerpo de la funcion}
    Ejemplos:
    recorrerBloques([listaBloques,0,2])= true
    recorrerBloques([listaBloques,10,13])= false
  */

  function recorrerBloques(lista,x,y)
  {
    if(isEmpty(lista))
    {
      return false;
    }
    else if (colisionTomb(x,y) == first(lista))
    {
      return true;
    }
    else
    {
      return recorrerBloques(rest(lista),x,y);
    }
  }
  
  /*
    Contrato: nombre, number, number --> number
    Funcionalidad: .
    nombre(){Cuerpo de la funcion}
    Ejemplos:
  */

  function comeMoneda(p, lista){
      if(isEmpty(lista)){
      return [];
      }
      if(p>=0 && p<=(lista).length){ //entre cero y la cantidad de datos de la lista, porque la va a recorrer
      if (p==0){
      return append(cons(0,[]),rest((lista)));
      }else{
        return append(cons(first(lista),[]),comeMoneda(p-1, (rest(lista))));
      }
     }else{
      return lista; 
     }
  }
  
  /*
    Contrato: nombre, number, number --> number
    Funcionalidad: .
    nombre(){Cuerpo de la funcion}
    Ejemplos:
  */

  // reemplaza la nueva lista sin la moneda
  function replaceX(x,lista, elem){
    if(x>=0 && x<lista.length){
      if(isEmpty(lista)){
        return [];
      }else if(x==0){
        return cons(elem,rest(lista));
      }else if(x==1){
        return cons(first(lista),cons(elem,rest(rest(lista)))); 
      }else {
      return cons(first(lista),replaceX(x-1,rest(lista),elem)); 
      }
    }else{
      return lista;
    }
  }  

  function apply(a,f) {
   if (!isEmpty(a)) {
     f(first(a));
     apply(rest(a),f);
    }
  }

  function moverAgua(agua,dir){
    const head=first(agua);
    return cons({x:head.x + dir.x,y:head.y + dir.y}, agua.slice(0, length(agua)-1));
  }

  function posicionYagua(agua){
    const posiciones=first(agua)
    return posiciones.y*(18.6)
  }

  //tamaño estandar de todo dentro del mapa
  const SIZE = 40;
  //tamaño ideal de los dibujos (especificamente seria el ancho y largo de cada bloque)
  const WIDTH = 25*SIZE;
  const HEIGHT = 15*SIZE;

  const dxa=20
  const dya=20

  //Variables iniciadas en nullptr
  let tomb = null;
  let MURO1 = null;
  let MURO2 = null;
  let MURO3 = null;
  let MURO4 = null;
  let FUEGO = null;
  let MONEDA =null;
  let AGUA=null
  //Variables utilizadas dentro de funciones.
  let quietoX= false;
  let quietoY= false;
  let listaBloques=[1,3,4,5];
  let muerteTomb= false;
  //Matriz del mapa

  // Ervin pon 6 donde quieras poner el fuego en el mapa, sitios no muy complicados pero que sea posible morir
  var mapa = 
  [
				[0, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 0, 1],
				[1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
				[1, 2, 3, 1, 1, 4, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 6, 1, 1, 1, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 5],
				[1, 2, 3, 1, 1, 6, 5, 2, 2, 5, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 2, 2, 2, 5, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 5, 1, 1, 1, 1, 1, 2, 1],
				[1, 1, 4, 2, 1, 2, 2, 2, 3, 1, 1, 4, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
				[5, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 1],
				[1, 2, 3, 1, 4, 2, 1, 1, 2, 2, 3, 1, 1, 4, 2, 5, 1, 1, 1, 2, 5, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 1, 5, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 4, 2, 1],
				[1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 5, 1, 4, 2, 3, 1, 2, 2, 2, 2, 2, 2, 1],
				[1, 2, 1, 2, 2, 5, 4, 2, 1, 4, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 3, 1, 5],
				[5, 2, 6, 4, 2, 1, 2, 2, 2, 2, 0, 0, 0, 1, 4, 2, 1, 4, 2, 5, 2, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 3, 4, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1],
	];
  
  function sketchProc(processing) {
    /**
     * Esto se llama antes de iniciar el juego
     */
    processing.setup = function () {
      //framerate, no tocar , solo para testear, pero volver a ponerlo en 60.
      processing.frameRate(60);
      processing.size(WIDTH, HEIGHT);
      //Carga las imagenes de los muros, monedas y Tomb
      MURO1 = processing.loadImage("images/muro1.png");
      MURO2 = processing.loadImage("images/muro2.png");
      MURO3 = processing.loadImage("images/muro3.png");
      MURO4 = processing.loadImage("images/muro4.png");
      FUEGO = processing.loadImage("images/fuego.png");
      tomb = processing.loadImage("images/tomb2.png");
      MONEDA = processing.loadImage("images/moneda.png");
      AGUA=processing.loadImage("images/Agua.jpeg")

      //Crea los atributos internos de Tomb y de moneda(moneda actualmente no esta editado y sigue sin uso)
      processing.state = {tomb: { x:11*SIZE, y:13*SIZE, width:(SIZE/*/1.5*/), height:(SIZE/*/1.5*/), dirx: 0, diry: 0}, moneda: [{ x: 2, y: 2 }, { x: 2, y: 1 }],agua:[{x:0,y:29}],dir:{x:0,y:-1/1200} };
      
    }

    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {
      processing.background(0, 0, 0);
      calcularPosicionTomb(world.tomb.x,world.tomb.y);
      apply(world.agua,sn =>
      {processing.image(AGUA,sn.x*dxa,sn.y*dya,1000,600)}); 

      // Dibuja el mapa en filas, dando una imagen a cada celda
      recursivelist(mapa, (row, i) => {
        recursivelist(row, (cell, j) => {
          if(cell ==1) { // Imagen de muro centrado
            murito1=processing.image(MURO1, j * SIZE, i *SIZE, SIZE, SIZE);
          }
          if (cell == 2) {
            //Imagen de las monedas
            processing.image(MONEDA, j * SIZE + SIZE / 3, i * SIZE + SIZE / 3, SIZE / 2.5, SIZE /2.5 );
          }
          if(cell == 3) { //Imagen de muro ladeado derecha
            processing.image(MURO2, j * SIZE, i * SIZE, SIZE, SIZE);
          }
          if(cell == 4) { //Imagen de muro ladeado izquierda
            processing.image(MURO3, j * SIZE, i * SIZE, SIZE, SIZE);
          }
          if(cell == 5) { //Imagen de muro dañado
            processing.image(MURO4, j * SIZE, i * SIZE, SIZE, SIZE);
          }
          if(cell == 6) { //Imagen de futuro muro de fuego
            processing.image(FUEGO, j * SIZE, i * SIZE, SIZE, SIZE);
          }
        });
      });

      //codigos de testeo para verificar posicion de tomb en todo momento
      //voy a comentar esto un momento:
      //console.log(world.tomb);
      //console.log(posicionActualTomb);
      
      //Solo actualiza al mundo Tomb dibujandolo a lo largo de su camino.
      if (world.time == 0)
        //imageMode(CENTER);
        processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
      else
        //imageMode(CENTER);
        processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
      
    }

   
    processing.onTic = function (world) {
      
      // Actualiza el tiempo lo que hace que tomb tenga su posicion en X y Y mas la velocidad respectiva entregada desde el teclado (onKeyEvent).
      
    
      //Decir lo que hay en la posicion de tomb
      px=(posicionActualTomb.x)
      py=(posicionActualTomb.y)

      if(world.tomb.x>=1){
        //console.log (world.tomb.y);        
        a=posicion(mapa,py);
        //console.log (posicion(a,px));
        //if(colisionTomb(py,px)==2){
        if(posicion(a,px) == 2){
        //  console.log("aquí hay una moneda");
          mapa=(replaceX(py,mapa,comeMoneda(px,posicion(mapa,py)))); //actualiza el mundo

        }else{
         // console.log("no hay moneda");//por lo tanto no hace nada
        }
      }


        ////////////
  
      // Todas las condiciones siguientes usan la funcion recorrerBloques() y dentro de esta funcion  se usa las siguientes funciones: colisionTomb(), posicion(). los argumentos que usa la funcion recorrerBloques() es: listaBloques creada en la linea 83, la estructura creada apartir de la funcion calcularPosicionTomb(); en el otro lado de la condicion de recorrerBloques() es... .

      //Colision a lo largo del tiempo en el eje Y,
      //Cuando pasa la condicion adecuada pone la velocidad en 0, pone el booleano quietoY en true, lo que significa que tomb esta quieto en el momento.
      
      if( recorrerBloques(listaBloques, px, py-1) && (world.tomb.diry ==-4))
      {
        quietoY=true;
        console.log("Choco contra la pared de arriba y paro")
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x , y: world.tomb.y + world.tomb.diry, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: 0}});
      }
      else if( recorrerBloques(listaBloques, px, py+1) && (world.tomb.diry ==4))
      {
        
        console.log("Choco contra la pared de abajo y paro");
        quietoY=true;
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x , y: world.tomb.y + world.tomb.diry, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: 0}});
        
      }

      //Colision a lo largo del tiempo en el eje X
      //Cuando pasa la condicion adecuada pone la velocidad en 0, pone el booleano quietoX en true, lo que significa que tomb esta quieto en el momento.
      
      if( recorrerBloques(listaBloques, px-1, py) && (world.tomb.dirx ==-4))
      {
        console.log("Choco contra la pared izq y paro")
        quietoX=true;
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y + world.tomb.diry, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: world.tomb.diry}});
      }
      else if( recorrerBloques(listaBloques, px+1, py) && (world.tomb.dirx ==4))
      {
        console.log("Choco contra la pared derecha y paro")
        quietoX=true;
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y + world.tomb.diry, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: world.tomb.diry}});
        
      }
      
      //Ervin por aqui va mas o menos tu colision con el fuego , normalmente sus coordenadas de x y como width y hight se podrian ir a null o a un lugar donde no se vea el tomb para decir que desaparecio, tu decides, pero segun esos datos va a trabajar seguramente alejandro 
      
      
       if (colisionTomb(px,py)==6)
      {
        return make(world, { time: world.time = 0, tomb: { x: 440, y: 524, width: SIZE, height:SIZE, dirx: 0, diry: 0}});
        muerteTomb=true;
      }

      if (world.tomb.y>=posicionYagua(world.agua) && ((world.tomb.y)-40)<posicionYagua(world.agua)){
        return make(world, { time: world.time = 0, tomb: { x: 440, y: 524, width: SIZE, height:SIZE, dirx: 0, diry: 0}, agua:[{x:0,y:29}],dir:{x:0,y:-1/800}});
        muerteTomb=true;
      }

      function iniciar(tomb){
        if (muerteTomb==true){
          muerteTomb=false;
        }      
      }
      

      
      //Esta linea 213, hace que tomb siga actualizandose cuando no haya ningun bloque al lado de el como las anteriores condicionales.

      return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y + world.tomb.diry, width:world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry}, agua: moverAgua(world.agua, world.dir)});
 
    }

  






  
    //Cada vez que se presione una direccion va a tener una velocidad en X, Y ó no tener velocidad segun las condicionales.

    processing.onKeyEvent = function (world, keyCode) {
    
      // Todas las condiciones siguientes usan la funcion recorrerBloques() y dentro de esta funcion  se usa las siguientes funciones: colisionTomb(), posicion(). los argumentos que usa la funcion recorrerBloques() es: listaBloques creada en la linea 83, la estructura creada apartir de la funcion calcularPosicionTomb(); en el otro lado de la condicion de recorrerBloques() son dos booleanos creados para detectar si tomb esta en movimiento o no en los ejes Y y X.

      // Movimiento hacia arriba de Tomb, tiene la condicion que si esta quieto y arriba de el hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondre la condicion en false.

      if (keyCode==processing.UP)
      {
        if( recorrerBloques(listaBloques, px, py-1) && quietoY== true )
        {
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: 0 }} );
        }
        else
        { 
          quietoY=false;
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: -4 }} );
        }
      }

      // Movimiento hacia abajo de Tomb, tiene la condicion que si esta quieto y abajo hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondra la condicion en false.

      if (keyCode==processing.DOWN)
      {
        if( recorrerBloques(listaBloques, px, py+1) && quietoY== true )
        {
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: 0 }} );
        }
        else
        {
          quietoY=false;
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: 4 }} );
        }
      }

      // Movimiento hacia la izquierda de Tomb, tiene la condicion que si esta quieto y a su izquierda hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondra la condicion en false.

      if (keyCode==processing.LEFT)
      {
        if( recorrerBloques(listaBloques,px-1,py) && quietoX==true )
        {
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: 0 }} );
        }
        else
        {
          quietoX=false;
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: -4, diry: 0 }} );
        }
      }

      // Movimiento hacia la derecha de Tomb, tiene la condicion que si esta quieto y a su derecha hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondra la condicion en false.

      if (keyCode==processing.RIGHT)
      {
        if( recorrerBloques(listaBloques,px+1,py) && quietoX==true )
        {
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: 0 }} );
        }
        else
        {
          quietoX=false;
          return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 4, diry: 0 }} );
        }
      }
    }


    // ******************** De aquí hacia abajo no debe cambiar nada. ********************

    // Esta es la función que pinta todo. Se ejecuta n veces por segundo. 
    // No cambie esta función. Su código debe ir en drawGame
    processing.draw = function () {
      processing.drawGame(processing.state);
      processing.state = processing.onTic(processing.state);
    };

    // Esta función se ejecuta cada vez que presionamos una tecla. 
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.keyPressed = function () {
      processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
    }

    // Esta función se ejecuta cada vez movemos el mouse. 
    // No cambie esta función. Su código debe ir en onKeyEvent
    processing.mouseMoved = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
    }

    // Estas funciones controlan los eventos del mouse. 
    // No cambie estas funciones. Su código debe ir en OnMouseEvent
    processing.mouseClicked = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mouseDragged = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mousePressed = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }

    processing.mouseReleased = function () {
      processing.state = processing.onMouseEvent(processing.state,
        { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
    }
    // Fin de los eventos del mouse
  }
 











  var canvas = document.getElementById("canvas");

  // Adjuntamos nuestro sketch al framework de processing
  var processingInstance = new Processing(canvas, sketchProc);