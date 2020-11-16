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
  function colision(world)
  {
    if(world.tomb.x + world.tomb.width >= WIDTH)
    {
      make(world, {tomb:{dirx:0}});
    }
    if(world.tomb.x <= 0)
    {
      make(world, {tomb:{dirx:0}});
    }
    if(world.tomb.y+ world.tomb.height >= HEIGHT)
    {
      make(world, {tomb:{diry:0}});
    }
      if(world.tomb.y <= 0)
    {
      make(world, {tomb:{diry:0}});
    }
  }
  */
  const SIZE = 40;
  //tamaño de ancho y largo
  const WIDTH = 24*SIZE;
  const HEIGHT = 15*SIZE;
  //tamaño ideal de los dibujos (especificamente seria el ancho y largo de cada bloque)
  

  //Variables iniciadas en nullptr
  let tomb = null;
  let MURO1 = null;
  let MURO2 = null;
  let MURO3 = null;
  let MURO4 = null;
  let MONEDA =null;

  //Matriz del mapa
  const mapa = 
  [
				[5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
				[1, 2, 3, 1, 1, 4, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 5],
				[1, 2, 3, 1, 1, 2, 5, 2, 2, 5, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 2, 2, 2, 5, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 5, 1, 1, 1, 1, 1, 2, 1],
				[1, 1, 4, 2, 1, 2, 2, 2, 3, 1, 1, 4, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
				[5, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 1],
				[1, 2, 3, 1, 4, 2, 1, 1, 2, 2, 3, 1, 1, 4, 2, 5, 1, 1, 1, 2, 5, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 1, 5, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 4, 2, 1],
				[1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 5, 1, 4, 2, 3, 1, 2, 2, 2, 2, 2, 2, 1],
				[1, 2, 1, 2, 2, 5, 4, 2, 1, 4, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 3, 1, 5],
				[5, 2, 1, 4, 2, 1, 2, 2, 2, 2, 0, 0, 0, 1, 4, 2, 1, 4, 2, 5, 2, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 3, 4, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1]
	];
  
  function sketchProc(processing) {
    /**
     * Esto se llama antes de iniciar el juego
     */
    processing.setup = function () {
      //framerate, no tocar puede malograr el codigo
      processing.frameRate(60);
      processing.size(WIDTH, HEIGHT);
      //Carga las imagenes de los muros, monedas y Tomb
      MURO1 = processing.loadImage("images/muro1.png");
      MURO2 = processing.loadImage("images/muro2.png");
      MURO3 = processing.loadImage("images/muro3.png");
      MURO4 = processing.loadImage("images/muro4.png");
      tomb = processing.loadImage("images/tomb.png");
      MONEDA = processing.loadImage("images/moneda.png");

      //Crea los atributos internos de Tomb y de moneda(moneda actualmente no esta editado y sigue sin uso)
      processing.state = {tomb: { x:11*SIZE, y:13*SIZE, width:SIZE, height:SIZE, dirx: 0, diry: 0}, moneda: [{ x: 1, y: 2 }, { x: 2, y: 1 }] };
      
    }
    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {
      processing.background(0, 0, 0);
      calcularPosicionTomb(world.tomb.x,world.tomb.y); 

      // Dibuja el mapa en filas, dando una imagen a cada celda
      recursivelist(mapa, (row, i) => {
        recursivelist(row, (cell, j) => {
          if(cell == 1) { //muro centrado
            murito1=processing.image(MURO1, j * SIZE, i * SIZE, SIZE, SIZE);
            //hacer un rectangulo que guarde la imagen de muro y tenga sus propios atributos para luego hacer colisiones
            // para no tener que hacer muchos if solo pon mas condicionales en el if con || o &&
          }
          if (cell == 2) {
            //le da imagen a las monedas
            processing.image(MONEDA, j * SIZE + SIZE / 3, i * SIZE + SIZE / 3, SIZE / 2.5, SIZE /2.5 );
          }
          if(cell == 3) { //muro ladeado derecha
            processing.image(MURO2, j * SIZE, i * SIZE, SIZE, SIZE);
          }
          if(cell == 4) { //muro ladeado izquierda
            processing.image(MURO3, j * SIZE, i * SIZE, SIZE, SIZE);
          }
          if(cell == 5) { //muro dañado
            processing.image(MURO4, j * SIZE, i * SIZE, SIZE, SIZE);
          }
          if(cell == 6) { //futuro muro de fuego
            processing.image(MURO4, j * SIZE, i * SIZE, SIZE, SIZE);
          }
        });
      });
      //voy a comentar esto un momento:
      // console.log(world.tomb);
      //console.log(posicionActualTomb);
      
      //Actualiza al mundo Tomb dibujandolo a lo largo de su camino
      if (world.time == 0)
        processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
      else
        processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
      
    }

   
    processing.onTic = function (world) {
      
      // Actualiza el tiempo lo que hace que tomb tenga su posicion en x mas la velocidad dada desde el teclado
      
      if(world.tomb.x + world.tomb.width >= WIDTH+4)
      {
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x - world.tomb.dirx, y: world.tomb.y - world.tomb.diry, width:SIZE, height:SIZE, dirx: 0, diry: world.tomb.diry}});
      }
      else if(world.tomb.x <= -4)
      {
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x - world.tomb.dirx, y: world.tomb.y - world.tomb.diry, width:SIZE, height:SIZE, dirx: 0, diry: world.tomb.diry}});
      }
      else if(world.tomb.y+ world.tomb.height >= HEIGHT+4)
      {
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y - world.tomb.diry, width:SIZE, height:SIZE, dirx: world.tomb.dirx, diry: 0}});
      }
      else if(world.tomb.y <= -4)
      {
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y - world.tomb.diry, width:SIZE, height:SIZE, dirx: world.tomb.dirx, diry: 0}});
      }
      else
      {
        return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y + world.tomb.diry, width:SIZE, height:SIZE, dirx: world.tomb.dirx, diry: world.tomb.diry}});
      }
 
    

      return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y + world.tomb.diry, width:SIZE, height:SIZE, dirx: world.tomb.dirx, diry: world.tomb.diry}});
    }

  
    //Cada vez que se presione una direccion va a tener una velocidad en X o Y, segun el caso.

    processing.onKeyEvent = function (world, keyCode) {
     //   console.log(world.tomb);
      if (keyCode==processing.UP)
      {
        return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width:SIZE, height:SIZE, dirx: 0, diry: -4 }} );
      }
      if (keyCode==processing.DOWN){
        return make(world,{tomb:{ x: world.tomb.x, y: world.tomb.y, width:SIZE, height:SIZE, dirx: 0, diry: 4 }} );
      }
      if (keyCode==processing.LEFT){
        return make(world, {tomb: { x: world.tomb.x , y: world.tomb.y, width:SIZE, height:SIZE, dirx: -4, diry: 0 }} );
      }
      if (keyCode==processing.RIGHT){
        return make(world, {tomb: { x: world.tomb.x ,y: world.tomb.y, width:SIZE, height:SIZE, dirx: 4, diry: 0 }} );
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