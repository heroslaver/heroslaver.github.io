//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

// Importamos las librerias si es necesario usar listas
const { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

function make(data, attribute) {
  return Object.assign({}, data, attribute);
}

/**
 * Se definen los mundos
 * let, var, const namne = null; 
 * No requiere interacción con el usuario
 */


function sketchProc(processing) {

  /**
   * Esto se llama antes de iniciar (espacio de trabajo)
   */
  processing.setup = function () {

    processing.frameRate(10);
    processing.size(400, 400);
    processing.state = { x: 0, y: 0, ancho: 100, alto: 100 };


  }


  // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
  processing.drawGame = function (world) {

    processing.background(255, 204, 0);
    processing.rect(world.x, world.y, world.ancho, world.alto)



  }

  // Actualiza el mundo despues de cada frame. En este ejemplo, no cambia nada, solo retorna una copia del mundo
  processing.onTic = function (world) {
    return make(world, {});
  }

  //Implemente esta función si quiere que su programa reaccione a eventos del mouse
  processing.onMouseEvent = function (world, event) {
    // Por ahora no cambia el mundo. Solo retorna una copia del mundo actual
    return make(world, {});
  };

  //Implemente esta función si quiere que su programa reaccione a eventos del teclado
  processing.onKeyEvent = function (world, event) {
    // Por ahora no cambia el mundo. Solo retorna una copia del mundo actual
    return make(world, {});
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