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
  posicion([1,0,0,0,2,0,3], 0)= 1
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
    return posiciones.y
  }

  function posicionCentrica(x,y)
  {
    centroTombX=Math.floor(x+((x-(x-SIZE))/2));
    centroTombY=Math.floor(y+((y-(y-SIZE))/2));

    centroTomb={x:centroTombX,y:centroTombY};
    return centroTomb;
  }

  function comparacion()
  {
    auxiliarX=40*posicionActualTomb.x;
    comparacionX= Math.floor(auxiliarX+((auxiliarX-(auxiliarX-SIZE))/2));
    
    auxiliarY=40*posicionActualTomb.y;
    comparacionY= Math.floor(auxiliarY+((auxiliarY-(auxiliarY-SIZE))/2));

    comparar={x:comparacionX,y:comparacionY};
    
    return ;
  } 

  function quieto(x,y)
  {
    if (x && y)
    {
      return true;
    }
    else if(x || y)
    {
      return false;
    }
    else
    {
      return false;
    }
  }
  /*
contratro: contar: list,number,number-> number
proposito: retorna la cantidad de 2 que hay en una lista
contar(lista){}
ejemplos:  
  contar([1,2,2,3,1]) -> 2
  contar([1,2,2,2,4,2]) -> 4
  contar([2]) -> 1
*/
function contar(mapa){
  if(isEmpty(mapa)){
    return 0;
  }else if(first(mapa)==2){
    return 1 + contar(rest(mapa));
  }else{
    return 0 + contar(rest(mapa))
  }
}
/*
contratro: contar: list-> number
proposito: retorna la cantidad de 2 que hay en una lista conformada por listas.(determina cuantas monedas hay)
cantidadMonedas(mapa){}
ejemplos:  
  cantidadMonedas([[1,2,2,2,2,1],[1,2,3,2,2]) -> 7
*/


function cantidadMonedas(mapa){
if(isEmpty(mapa)){
    return 0;
}else if(mapa.length==0){
  return 0;
}else if(mapa.length==1){
  return contar(posicion(mapa,0));
}else if(mapa.length==2){  
   return contar(posicion (mapa,0))+contar(posicion (mapa,mapa.length-1))
}else{
  return contar(posicion (mapa,0))+cantidadMonedas(rest(mapa));
}

}



  //tamaño estandar de todo dentro del mapa
  const SIZE = 40;
  //tamaño ideal de los dibujos (especificamente seria el ancho y largo de cada bloque)
  const WIDTH = 24*SIZE;
  const HEIGHT = 15*SIZE;

  const dxa=1
  const dya=1

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
  let presionadoArriba= false;
  let presionadoAbajo= false;
  let presionadoDerecha= false;
  let presionadoIzquierda= false;
  let perder = false;
  let ganar = true;

  //Variables de interfaz
  let vidas = 3;
  let puntos=0;
  

  //Matriz del mapa

  // Ervin pon 6 donde quieras poner el fuego en el mapa, sitios no muy complicados pero que sea posible morir
  var mapa = 
  [
				[5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
				[1, 2, 3, 1, 1, 4, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 5],
				[1, 2, 3, 1, 1, 2, 5, 2, 2, 5, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 2, 2, 2, 5, 2, 1, 2, 2, 1, 2, 2, 2, 1, 6, 1, 5, 1, 1, 1, 1, 1, 2, 1],
				[1, 1, 4, 2, 1, 2, 2, 2, 3, 1, 1, 4, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
				[5, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 3, 1],
				[1, 2, 3, 1, 4, 2, 1, 1, 2, 2, 3, 6, 1, 4, 2, 5, 1, 1, 1, 2, 5, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 1, 5, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 4, 2, 1],
				[1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 5, 1, 4, 2, 3, 1, 2, 2, 2, 2, 2, 2, 1],
				[1, 2, 1, 2, 2, 5, 4, 2, 1, 4, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 3, 1, 5],
				[5, 2, 6, 4, 2, 1, 2, 2, 2, 2, 0, 0, 0, 1, 4, 2, 1, 4, 2, 5, 2, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 3, 4, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1],
	];
  let cantMonedas = cantidadMonedas(mapa);
  
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
      processing.state = {tomb: { x:11*SIZE, y:13*SIZE, width:(SIZE/*/1.5*/), height:(SIZE/*/1.5*/), dirx: 0, diry: 0}, moneda: [{ x: 2, y: 2 }, { x: 2, y: 1 }],agua:[{x:0,y:620}],dir:{x:0,y:-1/30} };
    }
    // Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
    processing.drawGame = function (world) {
      processing.background(0, 0, 0);

      calcularPosicionTomb(world.tomb.x,world.tomb.y);
      posicionCentrica(world.tomb.x,world.tomb.y);
      comparacion();

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
        processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
      else
        processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
    }

    processing.onTic = function (world) {
   
      // Actualiza el tiempo lo que hace que tomb tenga su posicion en X y Y mas la velocidad respectiva entregada desde el teclado (onKeyEvent)

      //Decir lo que hay en la posicion de tomb
      px=(posicionActualTomb.x)
      py=(posicionActualTomb.y)

      if(world.tomb.x>=1){   
        a=posicion(mapa,py);
        //condicional de las monedas
        if(posicion(a,px) == 2){
          console.log("cantidad de monedas en el mapa: ", cantidadMonedas(mapa));
          puntos=puntos+10;
          console.log("los puntos son: ", puntos);
          mapa=(replaceX(py,mapa,comeMoneda(px,posicion(mapa,py)))); //actualiza el mundo
        }else{
         // console.log("no hay moneda");//por lo tanto no hace nada
        }

      }

        ////////////
  
     
      
      if (presionadoArriba && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        console.log("hizo la comprobacion arriba 2.0")
        quietoY=false;
        presionadoArriba =false;
        return make(world,{time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:-4}});
      }

      if (presionadoAbajo && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        console.log("hizo la comprobacion abajo 2.0")
        quietoY=false;
        presionadoAbajo =false;
        return make(world,{time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:4}});
      }

      if (presionadoIzquierda && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        console.log("hizo la comprobacion izquierda 2.0")
        quietoX=false;
        presionadoIzquierda =false;
        return make(world,{time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:-4, diry:0}});
      } 

      if (presionadoDerecha && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        console.log("hizo la comprobacion derecha 2.0")
        quietoX=false;
        presionadoDerecha =false;
        return make(world, {time:world.time+1,tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:4, diry:0}});
      }     


       // Todas las condiciones siguientes usan la funcion recorrerBloques() y dentro de esta funcion  se usa las siguientes funciones: colisionTomb(), posicion(). los argumentos que usa la funcion recorrerBloques() es: listaBloques creada en la linea 83, la estructura creada apartir de la funcion calcularPosicionTomb(); en el otro lado de la condicion de recorrerBloques() es... .

      //Colision a lo largo del tiempo en el eje Y,
      //Cuando pasa la condicion adecuada pone la velocidad en 0, pone el booleano quietoY en true, lo que significa que tomb esta quieto en el momento.

      if( recorrerBloques(listaBloques, px, py-1) && (world.tomb.diry ==-4) && (comparar.y==centroTomb.y))
      {
        quietoY=true;
        console.log("Choco contra la pared de arriba y paro")
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});
      }

      if( recorrerBloques(listaBloques, px, py+1) && (world.tomb.diry ==4) && (comparar.y==centroTomb.y))
      {
        quietoY=true;
        console.log("Choco contra la pared de abajo y paro");
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});

      }

      //Colision a lo largo del tiempo en el eje X
      //Cuando pasa la condicion adecuada pone la velocidad en 0, pone el booleano quietoX en true, lo que significa que tomb esta quieto en el momento.
      
      if( recorrerBloques(listaBloques, px-1, py) && (world.tomb.dirx==-4) && (comparar.x==centroTomb.x))
      {
        console.log("Choco contra la pared izq y paro")
        
        quietoX=true;
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});
      }
      
      if( recorrerBloques(listaBloques,px+1, py) && (world.tomb.dirx ==4) && (comparar.x==centroTomb.x))
      {
        console.log("Choco contra la pared derecha y paro")
        quietoX=true;
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});
        
      }


      //Colisión con obstáculo & muere Tomb
      
      if (colisionTomb(px,py)==6)
      { 
        muerteTomb=true;
        vidas=vidas-1
        return make(world, { time: world.time = 0, tomb: { x: 11*SIZE, y: 13*SIZE, width: SIZE, height:SIZE, dirx: 0, diry: 0}, agua:[{x:0,y:620}],dir:{x:0,y:-1/20}});
        
      }

      if (world.tomb.y>=(posicionYagua(world.agua)-32) && ((world.tomb.y)-40)<(posicionYagua(world.agua))-32){
        muerteTomb=true;
        vidas=vidas-1
        return make(world, { time: world.time = 0, tomb: { x:  11*SIZE, y: 13*SIZE, width: SIZE, height:SIZE, dirx: 0, diry: 0}, agua:[{x:0,y:620}],dir:{x:0,y:-1/20}});
      }


       //Función para restar las vidas de Tomb según su parámetro "vidas".
       
      if (muerteTomb==true){
        if(vidas>0){
          muerteTomb=false;
        }
        else if (vidas<=0){
          perder=true;
        }
      }
////////////////

       
         


              if(vidas==0){ 
          vidas=vidas-1
         Swal.fire({
         title: 'PERDISTE \n tu puntaje es: ',
         text: puntos,
         confirmButtonText: 'aceptar',
         footer: 'adios a todos',
         showConfirmButton: false
         
          
         
        });if(vidas<0){
                    
                document.location.reload(mapa)}
        
        }
        
        
        
    
     
  
         



        
      
     //  console.log("cantidad de monedas: ",cantMonedas); 
        
        if(cantMonedas==174&&puntos==1740){
          puntos=puntos+1;
         Swal.fire({
         title: 'GANASTE \n tu puntaje es: ',
         text: puntos,
         confirmButtonText: 'aceptar',
         footer: 'felicidades'
         
        });if((cantMonedas==174||puntos==1740)==true){
                    
                document.location.reload(mapa)}


         
        }
        
      
///////////////
      

      
      //Esta linea 213, hace que tomb siga actualizandose cuando no haya ningun bloque al lado de el como las anteriores condicionales.

      return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y + world.tomb.diry, width:world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry}, agua: moverAgua(world.agua, world.dir)});
 
    }

  






  
    //Cada vez que se presione una direccion va a tener una velocidad en X, Y ó no tener velocidad segun las condicionales.

    processing.onKeyEvent = function (world, keyCode) {
    
      // Todas las condiciones siguientes usan la funcion recorrerBloques() y dentro de esta funcion  se usa las siguientes funciones: colisionTomb(), posicion(). los argumentos que usa la funcion recorrerBloques() es: listaBloques creada en la linea 83, la estructura creada apartir de la funcion calcularPosicionTomb(); en el otro lado de la condicion de recorrerBloques() son dos booleanos creados para detectar si tomb esta en movimiento o no en los ejes Y y X.

      // Movimiento hacia arriba de Tomb, tiene la condicion que si esta quieto y arriba de el hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondre la condicion en false.

      if (keyCode==processing.UP)
      {
        presionadoArriba =true;
        
        if( recorrerBloques(listaBloques, px, py-1) && quieto(quietoX,quietoY))
        {
          console.log("se fue por aca arriba")
          presionadoArriba=false;
          return make(world,{tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0 }});
        }
        else 
        {
          console.log("no hizo nada arriba")
          quietoY=false;
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry }} );
        }
      }

      // Movimiento hacia abajo de Tomb, tiene la condicion que si esta quieto y abajo hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondra la condicion en false.

      if (keyCode==processing.DOWN)
      {
        presionadoAbajo =true;
        
        if( recorrerBloques(listaBloques, px, py+1) && quieto(quietoX,quietoY))
        {
          console.log("se fue por aca abajo")
          presionadoAbajo=false;
          return make(world,{tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0 }});
        }
        else 
        {
          console.log("no hizo aqui abajo")
          quietoY=false;
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry }} );
        }
      }

      // Movimiento hacia la izquierda de Tomb, tiene la condicion que si esta quieto y a su izquierda hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondra la condicion en false.

      if (keyCode==processing.LEFT)
      {
        presionadoIzquierda =true;
        
        if( recorrerBloques(listaBloques, px-1, py) && quieto(quietoX,quietoY))
        {
          console.log("se fue por aca izquierda")
          presionadoIzquierda=false;
          return make(world,{tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0 }});
        }
        else 
        {
          console.log("no hizo aqui izquierda")
          quietoY=false;
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry }} );
        }
      }

      // Movimiento hacia la derecha de Tomb, tiene la condicion que si esta quieto y a su derecha hay un bloque, no puede moverse mas, y no es asi cambiara su velocidad y pondra la condicion en false.

      if (keyCode==processing.RIGHT)
      {
        presionadoDerecha =true;
        
        if( recorrerBloques(listaBloques, px+1, py) && quieto(quietoX,quietoY))
        {
          console.log("se fue por aca derecha")
          presionadoDerecha=false;
          return make(world,{tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0 }});
        }
        else 
        {
          console.log("no hizo aqui derecha")
          quietoY=false;
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry }} );
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