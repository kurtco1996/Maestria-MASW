/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

//tamaño carta x e y
let carta_size=[70,100]

let cont_movimientos = document.getElementById("contador_movimientos"); 
let inicial,sobrantes,receptor1,receptor2,receptor3,receptor4,lista_de_tapetes;

function inicializacion(){
	for(i in lista_de_tapetes){
		borrar_tapete(lista_de_tapetes[i]);
	}
	inicial = {
		nombre: 'inicial',
		tapete: document.getElementById("inicial"),
		mazo: [],
		contador: document.getElementById("contador_inicial"),
		color: 'lightgrey',
		color_palo: ''
	};
	
	sobrantes = {
		nombre: 'sobrantes',
		tapete: document.getElementById("sobrantes"),
		mazo: [],
		contador: document.getElementById("contador_sobrantes"),
		color: 'lightblue',
		color_palo: ''
	};
	
	receptor1 = {
		nombre: 'receptor1',
		tapete: document.getElementById("receptor1"),
		mazo: [],
		contador: document.getElementById("contador_receptor1"),
		color: 'lightgreen',
		palo:'',
		numero:12,
		color_palo: ''
	};
	
	receptor2 = {
		nombre: 'receptor2',
		tapete: document.getElementById("receptor2"),
		mazo: [],
		contador: document.getElementById("contador_receptor2"),
		color: 'lightgreen',
		palo:'',
		numero:12,
		color_palo: ''
	};
	
	receptor3 = {
		nombre: 'receptor3',
		tapete: document.getElementById("receptor3"),
		mazo: [],
		contador: document.getElementById("contador_receptor3"),
		color: 'lightgreen',
		palo:'',
		numero:12,
		color_palo: ''
	};
	
	receptor4 = {
		nombre: 'receptor4',
		tapete: document.getElementById("receptor4"),
		mazo: [],
		contador: document.getElementById("contador_receptor4"),
		color: 'lightgreen',
		palo:'',
		numero:12,
		color_palo: ''
	};
	
	lista_de_tapetes=[inicial,sobrantes,receptor1,receptor2,receptor3,receptor4];
	for(i in lista_de_tapetes){
		actualizar_mazo_HTML(lista_de_tapetes[i]);
	}
}

//fuente : https://www.w3schools.com/html/html5_draganddrop.asp
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id); //??????
}
  
function drop(ev) {
	ev.preventDefault();
	var id_carta = ev.dataTransfer.getData("text");

	id_tapete=es_id_tapete(ev.target.id) //Comprobar si este id es un tapete
	//ev.target.appendChild(carta);//Podriamos quitar esto y añadir una funcion de actualizar barajas
	applyInitialStyle(ev);
	actualizar(id_tapete,id_carta)
}

function es_id_tapete(id){
	//Comprobar si este id es un tapete
	var clase_tapete = document.getElementById(id).className;
	if(clase_tapete!='tapete'&&clase_tapete!='tapete receptor'){
		id=document.getElementById(id).parentElement.id;
	}
	return id
}

function dragover(ev){
	ev.preventDefault();
	//PINTAR TODO, NO SOLO UNA PARTE
	//para ello primero localizar el tapete donde se encuentra
	id_tapete=es_id_tapete(ev.target.id) //Comprobar si este id es un tapete
	for(const tapeteItem of lista_de_tapetes){
		if(tapeteItem.nombre==id_tapete){
			tapeteItem.tapete.style.backgroundColor='yellow';
			for(const mazoItem of tapeteItem.mazo){
				document.getElementById(mazoItem.id).style.backgroundColor='';
			}
			tapeteItem.contador.style.backgroundColor='';
		}
	}
}

function dragleave(ev){
	applyInitialStyle(ev);
}

function applyInitialStyle(ev){
	for(const tapeteItem of lista_de_tapetes){
		tapeteItem.tapete.style.backgroundColor=tapeteItem.color;
		for(const mazoItem of tapeteItem.mazo){
			document.getElementById(mazoItem.id).style.backgroundColor='';
		}
		tapeteItem.contador.style.backgroundColor='';
	}
}

// Tiempo
let cont_tiempo  = document.getElementById("contador_tiempo"); // span cuenta tiempo
let segundos 	 = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

function actualizar(id_tapete_final,id_carta){
	//identificar donde estaba la carta previamente
	id_tapete_origen=document.getElementById(id_carta).parentElement.id;

	for(const tapeteItem of lista_de_tapetes){
		if(tapeteItem.nombre==id_tapete_final){
			var tapeteFinal=tapeteItem
		}
		if(tapeteItem.nombre==id_tapete_origen){
			var tapeteOrigen = tapeteItem;
		}
	}

	//Comprobar si es posible el movimiento -> FALTA
	if (logica_juego(tapeteFinal,tapeteOrigen,id_carta)){
		//actualizar listas
		
		//quitar de la origen
		borrar_tapete(tapeteOrigen);
		carta_cambio = tapeteOrigen.mazo.pop();
		set_contador(tapeteOrigen.contador,tapeteOrigen.mazo.length);
		actualizar_mazo_HTML(tapeteOrigen);
		
		//anyadir a la final
		borrar_tapete(tapeteFinal);
		tapeteFinal.mazo.push(carta_cambio);
		set_contador(tapeteFinal.contador,tapeteFinal.mazo.length);
		actualizar_mazo_HTML(tapeteFinal);

		inc_contador(cont_movimientos);
		juego_terminado();
	}
}

function juego_terminado(){
	//Para que el juego termine, no deben de quedar cartas en el tapete inicial y en el tapete de sobrantes
	if(lista_de_tapetes[0].mazo.length==0){
		if(lista_de_tapetes[1].mazo.length==0){
			//Juego terminado:
			clearInterval(temporizador);
			document.getElementById('victoria').innerHTML="VICTORIA!!!!";
		}else{
			//Sacar las cartas de sobrantes, barajarlas y volver a llevarlas al tapete inicial:
			lista_de_tapetes[0].mazo=barajar(lista_de_tapetes[1].mazo);
			lista_de_tapetes[1].mazo=[];
			borrar_tapete(lista_de_tapetes[1]);
			actualizar_mazo_HTML(lista_de_tapetes[0]);
		}
	}
}

function logica_juego(tapete_final,tapete_origen,id_carta){
	carta=document.getElementById(id_carta)
	//Movimientos posible:
	//origen: inicial | final: sobrante
	if(tapete_origen.nombre=='inicial' && tapete_final.nombre=='sobrantes'){
		return true;
	}

	//valida que los tapetes de origen y destino sean de tipo inicial o obrantes
    if(!(tapete_origen.nombre=='inicial' || tapete_origen.nombre=='sobrantes')){
		return false;
	}

	//valida que los tapetes de destino sean de tipo receptor
	if(!tapete_final.nombre.startsWith('receptor')){
		return false;
	}
	
	var paloOrigen = carta.getAttribute('data-palo');
	var colorPaloOrigen = color_palo(paloOrigen);
	var numeroCartaOrigen = carta.getAttribute('data-numero');
	var colorPaloDestino = tapete_final.color_palo;
	var numeroCartaDestino = tapete_final.numero;

	if(colorPaloDestino != '' && colorPaloOrigen == colorPaloDestino){
		return false;
	}

	if(numeroCartaOrigen != numeroCartaDestino){
		return false;
	}

	if(numeroCartaDestino > 0){
		tapete_final.numero-=1;
	}

	tapete_final.palo=paloOrigen;
	tapete_final.color_palo = colorPaloOrigen;
	return true
}

// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// Desarrollo del comienzo de juego
function comenzar_juego(){
	document.getElementById('victoria').innerHTML="";
	document.getElementById('reset').innerHTML="Reiniciar";

	/* Crear baraja, es decir crear el inicial.mazo. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
	el path correcto en la URL asociada al atributo src de <img>). Una vez creado
	el elemento img, inclúyase como elemento del array inicial.mazo. 
	*/
	
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	inicializacion();

	/* Georgiy: BUCLE FOR PARA CREAR LAS CARTAS EN LA inicial.mazo 
	LAS IMAGENES SON EJEMPLO 1-cir.png o 3-viu.png */
	for(let palo in palos){
		for(let numero in numeros){
			var imagen = new Image(carta_size[0],carta_size[1]);
			imagen.src='imagenes/baraja/'+numeros[numero]+'-'+palos[palo]+'.png';
			imagen.id='ID_'+numeros[numero]+'-'+palos[palo];
			imagen.setAttribute('data-palo',palos[palo]);
			imagen.setAttribute('data-numero',numeros[numero]);
			lista_de_tapetes[0].mazo.push(imagen);
		}
	}
	for(i in lista_de_tapetes){
		set_contador(lista_de_tapetes[i].contador, lista_de_tapetes[i].mazo.length);
	}
	
	// Barajar
	lista_de_tapetes[0].mazo = barajar(lista_de_tapetes[0].mazo);

	// Dejar inicial.mazo en tapete inicial ???????????????????????????
	actualizar_mazo_HTML(lista_de_tapetes[0]);

	// Puesta a cero de contadores de mazos
	set_contador(cont_movimientos, 0);
	
	// Arrancar el conteo de tiempo
	arrancar_tiempo();

} // comenzar_juego

// Rutina asociada a boton reset: comenzar_juego
document.getElementById('reset').onclick = function(){comenzar_juego()};

/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

function arrancar_tiempo(){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	if (temporizador) clearInterval(temporizador); //clearInterval quita el interval
    let hms = function (){
			let seg = Math.trunc( segundos % 60 );
			let min = Math.trunc( (segundos % 3600) / 60 );
			let hor = Math.trunc( (segundos % 86400) / 3600 );
			let tiempo = ( (hor<10)? "0"+hor : ""+hor ) 
						+ ":" + ( (min<10)? "0"+min : ""+min )  
						+ ":" + ( (seg<10)? "0"+seg : ""+seg );
			set_contador(cont_tiempo, tiempo);
            segundos++;
		}
	segundos = 0;
    hms(); // Primera visualización 00:00:00
	temporizador = setInterval(hms, 1000); //Esta funcion llama a la funcion hms cada 1000ms
    	
} // arrancar_tiempo


/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
	Para reordenar el array puede emplearse el siguiente pseudo código:

	- Recorramos con i todos los elementos del array
		- Sea j un indice cuyo valor sea un número aleatorio comprendido 
			entre 0 y la longitud del array menos uno. Este valor aleatorio
			puede conseguirse, por ejemplo con la instrucción JavaScript
				Math.floor( Math.random() * LONGITUD_DEL_ARRAY );
		- Se intercambia el contenido de la posición i-ésima con el de la j-ésima
*/
function barajar(mazo) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! OK **/
	let pos_alterna; /* VAR O LET ????????????????????????????? */
	let cambio;
	for(let pos in mazo){
		do{
			pos_alterna = Math.floor(Math.random()*mazo.length);
		} while (pos==pos_alterna);
		
		cambio=mazo[pos];
		mazo[pos]=mazo[pos_alterna];
		mazo[pos_alterna]=cambio;
	}
	return mazo;
} // barajar

/**
 	En el elemento HTML que representa el tapete inicial (variable tapete_inicial)
	se deben añadir como hijos todos los elementos <img> del array mazo.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function actualizar_mazo_HTML(objeto) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	let p_x=0;
	let p_y=0;
	let p_z=0;
	for(let i in objeto.mazo){
		objeto.tapete.appendChild(objeto.mazo[i]);
		document.getElementById(objeto.mazo[i].id).style.position='absolute';
		if(objeto.nombre=='inicial'){
			document.getElementById(objeto.mazo[i].id).style.left=p_x*paso+'px';
			document.getElementById(objeto.mazo[i].id).style.top=p_y*paso+'px';
		}
		else{
			if(objeto.nombre!='sobrantes'){
				document.getElementById(objeto.mazo[i].id).style.left='0px';
				document.getElementById(objeto.mazo[i].id).style.top=p_y*paso+'px';
			}else{
				
				document.getElementById(objeto.mazo[i].id).style.left=p_x+'px';
				document.getElementById(objeto.mazo[i].id).style.top='0px';
			}
		}
		

		document.getElementById(objeto.mazo[i].id).style.zIndex=p_z;
		document.getElementById(objeto.mazo[i].id).style.backgroundColor='';
		document.getElementById(objeto.mazo[i].id).className='carta';
		document.getElementById(objeto.mazo[i].id).ondragstart=drag; //Cambiar a si es el ultimo de la baraja inicial o la de restantes pues que sea dragable si no, no

		p_x+=1;
		p_y+=1;
		p_z+=1;
	}
} // actualizar_mazo_HTML

function borrar_tapete(objeto){
	for(let i in objeto.mazo){
		objeto.tapete.removeChild(document.getElementById(objeto.mazo[i].id));
	}
}

/**
 	Esta función debe incrementar el número correspondiente al contenido textual
   	del elemento que actúa de contador
*/
function inc_contador(contador){
    contador.innerHTML = +contador.innerHTML + 1;
} // inc_contador

/**
	Idem que anterior, pero decrementando 
*/
function dec_contador(contador){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! ***/	
	contador.innerHTML = +contador.innerHTML -1; //ASI ????
} // dec_contador

/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function set_contador(contador, valor) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	contador.innerHTML=valor;
} // set_contador

// Obtiene el color del palo a partir del nombre del palo
function color_palo(palo){
	switch(palo){
		case 'viu':
		case 'cua':
			return 'rojo';
		default:
			return 'negro';
	}
}
