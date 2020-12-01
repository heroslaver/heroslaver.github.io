  //Vamos a usar http://processingjs.org/
  // o https://p5js.org/reference/
  // Importamos las librerias
  let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

  function make(data, attribute) {
    return Object.assign({}, data, attribute);
  }
  
  //Hace funcionar el reconocimiento de cada celda en el mapa.

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
    Contrato: comeMoneda: numbre --> list
    Funcionalidad: remplaza un elemento de una posicion dada de una lista por un cero
    comeMoneda(){Cuerpo de la funcion}
    Ejemplos:
     comeMoneda(2,[1,1,1,1,1])->[1,1,0,1,1]
     comeMoneda(0,[1,1,1,1,1])->[0,1,1,1,1]  
     comeMoneda(4,[1,1,1,1,1])->[1,1,1,1,0]     
  */

  function comeMoneda(p,lista){
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
    Contrato: numbre, list, number --> list
    Funcionalidad: reemplaza la nueva lista sin la moneda en el mapa
    replaceX(x,lista, elem){Cuerpo de la funcion}
    Ejemplos:
      replaceX(0,[1,2,3],2)->[2,2,3] 
      replaceX(3,[1,2,9,9,8],2)->[1,2,9,3,8] 
  */ 
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

  /*
    Contrato: apply, list, function --> list
    Funcionalidad: aplica los atributos definidos para un elemento a la forma o parte visual de este.
    apply(){Cuerpo de la funcion}
  */
  
  function apply(a,f) {
   if (!isEmpty(a)) {
     f(first(a));
     apply(rest(a),f);
    }
  }

  /*
    Contrato: moverAgua, list, JSON --> list
    Funcionalidad: extrae el primer elemento de una lista que es a su vez una estructura y suma sus elementos con los de otra estructura para crear un lista nueva.
    moverAgua(){Cuerpo de la funcion}
    Ejemplos:
    moverAgua([{x:9, y:30}],{x:4, y:9}) -> [{x:13 , y:39}]
  */

  function moverAgua(agua,dir)
  {
    const head=first(agua);
    return cons({x:head.x + dir.x,y:head.y + dir.y}, agua.slice(0, length(agua)-1));
  }
  
  /*
    Contrato: posicionYagua, list--> number
    Funcionalidad: mostrar un elemento de una estructura la cual se encuentra dentro de una lista
    posicionYagua(){Cuerpo de la funcion}
    Ejemplos:
    posicionYagua([{x: 4, y:8}]) -> 8
  */
  
  function posicionYagua(agua)
  {
    const posiciones=first(agua)
    return posiciones.y
  }

  /*
    contrato: posicionCentrica: number number -> structure
    proposito: retorna la posicion centrica de Tomb estando en movimiento.
    posicionCentrica(){Cuerpo de la funcion}
    ejemplos:  
    posicionCentrica() -> [380,540]
  */
    
  function posicionCentrica(x,y)
  {
    centroTombX=Math.floor(x+((x-(x-SIZE))/2));
    centroTombY=Math.floor(y+((y-(y-SIZE))/2));

    centroTomb={x:centroTombX,y:centroTombY};
    return centroTomb;
  }

  /*
    contrato: comparacion: nothing -> structure
    proposito: retorna la posicion centrica de la casilla en la que tomb se encuentra.
    comparacion(){Cuerpo de la funcion}
    ejemplos:  
    comparacion() -> [460,540]
  */

  function comparacion()
  {
    auxiliarX=40*posicionActualTomb.x;
    comparacionX= Math.floor(auxiliarX+((auxiliarX-(auxiliarX-SIZE))/2));
    
    auxiliarY=40*posicionActualTomb.y;
    comparacionY= Math.floor(auxiliarY+((auxiliarY-(auxiliarY-SIZE))/2));

    comparar={x:comparacionX,y:comparacionY};
    
    return comparar ;
  } 

  /*
    contrato: contar: list,number,number-> number
    proposito: retorna la cantidad de 2 que hay en una lista
    contar(lista){Cuerpo de la funcion}
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
    contratro: cantidadMonedas: list-> number
    proposito: retorna la cantidad de 2 que hay en una lista conformada por listas.(determina cuantas monedas hay).
    cantidadMonedas(mapa){Cuerpo de funcion}
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
  const WIDTH=24*SIZE;
  const HEIGHT=15*SIZE;

  //Variables iniciadas en nullptr
  let tomb=null;
  let MURO1=null;
  let MURO2=null;
  let MURO3=null;
  let MURO4=null;
  let AGUITA=null;
  let MONEDA=null;
  let AGUA=null;
  let MANZANA=null;
  
  //Variables utilizadas dentro de funciones.
  let quieto=false;
  let listaBloques=[1,3,4,5];
  let muerteTomb=false;
  let presionadoArriba=false;
  let presionadoAbajo=false;
  let presionadoDerecha=false;
  let presionadoIzquierda=false;
  let perder=false;
  let tiempo=0;
  let inicio = true;

  //Variables de interfaz
  let vidas=3;
  let puntos=0;

    /*contrato: actualizaVida: nothing -> number
    proposito: Actualizar los valores de vida dentro de la interfaz.
    actualizaVida(number){Cuerpo de la funcion}
    ejemplos:  
    actualizaVida(3) -> 3
    actualizaVida(1) -> 1
    */

  function actualizaVida() {
    if (vidas>=0){
      verVidas.textContent = vidas;
    }
  };
   /*contrato: actualizaPuntaje: nothing -> number
    proposito: Actualizar los valores de puntaje dentro de la interfaz.
    actualizaPuntaje(number){Cuerpo de la funcion}
    ejemplos:  
    actualizaPuntaje(10) -> 10
    actualizaPuntaje(100) -> 100
    */

  function actualizaPuntaje() {
    verScore.textContent = puntos;
  };

  const verScore = document.getElementById("puntos");
  const verVidas = document.getElementById("vidas");
  

  //Matriz del mapa

  var mapa = 
  [
				[5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 7, 2, 2, 2, 2, 2, 1, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 1],
				[1, 2, 3, 1, 1, 4, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 5],
				[1, 2, 3, 1, 6, 2, 5, 2, 2, 5, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 2, 2, 2, 5, 2, 1, 2, 2, 1, 2, 2, 2, 1, 6, 1, 5, 1, 1, 1, 1, 1, 2, 1],
				[1, 6, 4, 2, 1, 2, 2, 2, 3, 1, 1, 4, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
				[5, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 1, 2, 6, 1],
				[1, 2, 3, 1, 4, 2, 6, 1, 2, 2, 3, 1, 1, 4, 2, 5, 1, 1, 1, 2, 5, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 1, 5, 2, 2, 6, 2, 2, 2, 2, 2, 2, 1, 2, 1, 4, 2, 1],
				[1, 2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 5, 1, 4, 2, 3, 1, 2, 2, 2, 2, 2, 2, 1],
				[1, 2, 1, 2, 2, 5, 4, 2, 1, 4, 2, 1, 2, 2, 2, 2, 1, 2, 2, 6, 2, 3, 1, 5],
				[5, 2, 6, 4, 2, 1, 2, 2, 2, 2, 0, 0, 0, 1, 4, 2, 1, 4, 2, 5, 2, 2, 2, 1],
				[1, 2, 2, 2, 2, 2, 2, 2, 3, 4, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
				[1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1],
	];

  //Guarda la cantidad de monedas del mapa.
  let cantMonedas=cantidadMonedas(mapa);
  
  function sketchProc(processing) {
    
    //Esto se llama antes de iniciar el juego.
    
    processing.setup = function () {

      //framerate del juego, alto y largo.
      processing.frameRate(60);
      processing.size(WIDTH, HEIGHT);

      //Carga las imagenes de los muros, monedas, manzana, agua y Tomb.
      MURO1=processing.loadImage("images/muro1.png");
      MURO2=processing.loadImage("images/muro2.png");
      MURO3=processing.loadImage("images/muro3.png");
      MURO4=processing.loadImage("images/muro4.png");
      AGUITA=processing.loadImage("images/Aguita.png");
      tomb=processing.loadImage("images/tomb.png");
      MONEDA=processing.loadImage("images/moneda.png");
      MANZANA=processing.loadImage("images/Apple.png");
      AGUA=processing.loadImage("images/Agua.jpeg");
      
      //Crea los atributos internos de Tomb y del agua.
      processing.state={tomb:{x:11*SIZE, y:13*SIZE, width:(SIZE), height:(SIZE), dirx:0, diry:0}, agua:[{x:0, y:610}], dir:{x:0, y:-1/15}};
    }

    //Todo lo que dibuja al juego
    processing.drawGame = function (world) {
      processing.background(0, 0, 0);
      
      //llamadas de funciones para hacer uso de ellas mas adelante del codio
      calcularPosicionTomb(world.tomb.x,world.tomb.y);
      posicionCentrica(world.tomb.x,world.tomb.y);
      comparacion();
      apply(world.agua,sn =>
      {processing.image(AGUA,sn.x*1,sn.y*1,1000,600)});
      actualizaVida();
      actualizaPuntaje();
      

      // Dibuja el mapa en filas, dando una imagen a cada celda
      recursivelist(mapa, (row, i) => {
        recursivelist(row, (cell, j) => {
          if(cell ==1) {//Imagen de muro centrado
            murito1=processing.image(MURO1, j * SIZE, i *SIZE, SIZE, SIZE);
          }
          if(cell == 2) {//Imagen de las monedas
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
          if(cell == 6) { //Imagen del charco
            processing.image(AGUITA, j * SIZE, i * SIZE, SIZE, SIZE);
          }
          if(cell == 7) { //Imagen de manzana
            processing.image(MANZANA, j * SIZE + SIZE / 3, i * SIZE + SIZE / 3, SIZE / 2, SIZE /2);
          }
        });
      });

      //Actualiza al mundo Tomb dibujandolo a lo largo de su camino.
      if (world.time == 0)
      processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
      else
      processing.image(tomb, world.tomb.x , world.tomb.y, world.tomb.width,world.tomb.height);
    }

    //actualiza el juego en cada tic del framerate.
    processing.onTic = function (world) {

      //Dice lo que hay en la posicion de tomb X y Y con el llamado de la funcion calcularPosicionTomb().
      px=(posicionActualTomb.x)
      py=(posicionActualTomb.y)

      //Condicional que comienza a contar cuando tomb recoge una manzana, hace que el agua vuelva a la normalidad.
      if(tiempo==(10*60)){
        tiempo=0;
        return make(world, { time: world.time + 1, agua:[{x:0,y:posicionYagua(world.agua)}],dir:{x:0,y:-1/15}});
      }
      else if(tiempo<(10*60) && tiempo>0){
        tiempo=tiempo+1;
        if(posicionYagua(world.agua)>=(15*SIZE))
        {
          console.log("cumplio");
          tiempo=(10*60);
        }
      }
   
      //condicional de las monedas y manzanas, suma los puntos, y actualiza el mundo sin la moneda o manzana correspondiente.
      
      if(posicion(posicion(mapa,py),px) == 2 || posicion(posicion(mapa,py),px) == 7)
      {
        puntos=puntos+10;
        if(posicion(posicion(mapa,py),px)==2)
        {
          mapa=(replaceX(py,mapa,comeMoneda(px,posicion(mapa,py))));
        }
        if(posicion(posicion(mapa,py),px)==7)
        {
            tiempo=1;
            mapa=(replaceX(py,mapa,comeMoneda(px,posicion(mapa,py))));
            return make(world, { time: world.time + 1, agua:[{x:0,y:posicionYagua(world.agua)}],dir:{x:0,y:1/10}});
        }
        //actualiza el mundo
        mapa=(replaceX(py,mapa,comeMoneda(px,posicion(mapa,py)))); 
      }
     
      //Colisión con el charco de agua y define el booleano muerteTomb en true.
      
      if(colisionTomb(px,py)==6)
      { 
        muerteTomb=true;
        vidas=vidas-1
        return make(world, { time: world.time = 0, tomb: { x: 11*SIZE, y: 13*SIZE, width: SIZE, height:SIZE, dirx: 0, diry: 0}, agua:[{x:0,y:620}],dir:{x:0,y:-1/10}});
      }

      //Colision de tomb con el agua, regresa el agua a su posicion original y aumenta la velocidad de esta, define el booleano muerteTomb
      if(world.tomb.y>=(posicionYagua(world.agua)-32) && ((world.tomb.y)-40)<(posicionYagua(world.agua))-32){
        muerteTomb=true;
        vidas=vidas-1
        return make(world, { time: world.time = 0, tomb: { x:  11*SIZE, y: 13*SIZE, width: SIZE, height:SIZE, dirx: 0, diry: 0}, agua:[{x:0,y:620}],dir:{x:0,y:-1/10}});
      }

      //Restar las vidas de Tomb según su parámetro "vidas".
       
      if(muerteTomb==true){
        if(vidas>0){
          muerteTomb=false;
        }
        else if (vidas<=0){
          perder=true;
        }
      }
       
      //Botón de reinicio tras perder todas las vidas.

      if(vidas==0){
        Swal.fire({
          title: 'PERDISTE \n tu puntaje es: ',
          text: puntos,
          confirmButtonText: 'aceptar',
          showConfirmButton: 'aceptar',
          padding: '2rem',
          //background: '#FDA715'
          //grow: 'fullscreen'
       
        }).then(resultado => {
        if (resultado.value) {
          // Hicieron click en el boton
          if(vidas<=0)
          {         
            document.location.reload(mapa)
          }
          perder=false
          console.log("boton");
          
        }});
        vidas=vidas-1;      
      }
      
      //Muestra una pantalla donde dice que Ganaste con la puntuacion que se consigue.
        
      if(cantMonedas==172&&puntos==1740)
      {
        vidas=3;
        puntos=puntos+1;
        Swal.fire({
          title: 'GANASTE \n tu puntaje es: ',
          text: puntos,
          confirmButtonText: 'aceptar',
        }).then(resultado => {
        if (resultado.value) 
        {
            // Hicieron click en el boton
          if((cantMonedas==172||puntos==1740)==true)
          {      
            document.location.reload(mapa)
          }
          
        }});  
      }

      //Condicionales que definen el movimiento de Tomb, las condicionales consta de un booleano Presionado"LaDireccion" que es true cuando pasa por el keyEvent, y dos funciones: comparacion() y posicioncentrica() que es true cuando tomb se encuentre centrado en el cuadro correspondiente; Dara velocidad hacia la direccion correspondiente y pone el booleano en false de nuevo.
      
      if (presionadoArriba && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        presionadoArriba =false;
        return make(world,{time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:-4}});
      }

      if (presionadoAbajo && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        presionadoAbajo =false;
        return make(world,{time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:4}});
      }

      if (presionadoIzquierda && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        presionadoIzquierda=false;
        return make(world,{time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:-4, diry:0}});
      } 

      if (presionadoDerecha && comparar.y == centroTomb.y && comparar.x==centroTomb.x)
      {
        presionadoDerecha=false;
        return make(world, {time:world.time+1,tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:4, diry:0}});
      }     

      //Todas las condiciones siguientes usan la funcion recorrerBloques() y dentro de esta funcion  se usa las siguientes funciones: colisionTomb(), posicion(). los argumentos que usa la funcion recorrerBloques() es: listaBloques creada en la linea 249,y la estructura creada apartir de la funcion calcularPosicionTomb(); las otras condicionales, verifican la velocidad de tomb y compara dos funciones: comparacion() y posicioncentrica() para frenar solo y cuando tomb se encuentre centrado.
     
      //Colision a lo largo del tiempo en el eje Y, cuando pasa la condicion adecuada pone la velocidad en 0.
      
      if ( recorrerBloques(listaBloques, px, py-1) && (world.tomb.diry ==-4)  && (comparar.y==centroTomb.y))
      {
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});
      }
    
      if( recorrerBloques(listaBloques, px, py+1) && (world.tomb.diry ==4) && (comparar.y==centroTomb.y))
      {
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});
      }

      //Colision a lo largo del tiempo en el eje X, cuando pasa la condicion adecuada pone la velocidad en 0.
      
      if( recorrerBloques(listaBloques, px-1, py) && (world.tomb.dirx==-4) && (comparar.x==centroTomb.x))
      {
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});
      }
      
      if( recorrerBloques(listaBloques,px+1, py) && (world.tomb.dirx ==4) && (comparar.x==centroTomb.x))
      {
        return make(world, {time:world.time+1, tomb:{x:world.tomb.x, y:world.tomb.y, width:world.tomb.width, height:world.tomb.height, dirx:0, diry:0}});
      }


      //Esta linea, hace que tomb siga actualizandose aun cuando no haya ningun bloque al lado ó no se haya cumplido las anteriores condicionales.

      return make(world, { time: world.time + 1, tomb: { x: world.tomb.x + world.tomb.dirx, y: world.tomb.y + world.tomb.diry, width:world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry}, agua: moverAgua(world.agua, world.dir)});

    }

    //Cada vez que se presione una direccion va a tener una nueva velocidad en X, Y ó tener la misma velocidad segun las condicionales.

    processing.onKeyEvent = function (world, keyCode) {
    
      // Movimiento hacia arriba de Tomb, tiene la condicion que si su velocidad esta abajo podra voltear rapidamente y en cambio seguira dibujando a tomb a lo largo del transcurso.

      if (keyCode==processing.UP)
      {
        presionadoArriba =true;
        if(world.tomb.diry==4)
        {
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: -world.tomb.diry }} );
        }
        else
        {
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry }} );
        }
      }

      // Movimiento hacia abajo de Tomb, tiene la condicion que si su velocidad esta hacia arriba podra voltear rapidamente y en cambio seguira dibujando a tomb a lo largo del transcurso.

      if (keyCode==processing.DOWN)
      {
        presionadoAbajo =true;
        if(world.tomb.diry==-4)
        {
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: 0, diry: -world.tomb.diry }} );
        }
        else
        {
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry }} );
        } 
      }

      // Movimiento hacia la izquierda de Tomb, tiene la condicion que si su velocidad esta a la derecha podra voltear rapidamente y en cambio seguira dibujando a tomb a lo largo del transcurso.

      if (keyCode==processing.LEFT)
      {
        presionadoIzquierda =true;
        if(world.tomb.dirx==4)
        {
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: -world.tomb.dirx, diry: 0 }} );
        }
        else
        {
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: world.tomb.dirx, diry: world.tomb.diry }} );
        }
      }

      // Movimiento hacia la derecha de Tomb, tiene la condicion que si su velocidad esta a la izquierda podra voltear rapidamente y en cambio seguira dibujando a tomb a lo largo del transcurso.

      if (keyCode==processing.RIGHT)
      {
        presionadoDerecha =true;
        if(world.tomb.dirx==-4)
        {
          return make(world,{tomb:{ x: world.tomb.x, y:world.tomb.y, width: world.tomb.width, height:world.tomb.height, dirx: -world.tomb.dirx, diry: 0 }} );
        }
        else
        {
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