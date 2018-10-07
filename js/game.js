//Campo de jogo
var game = document.getElementById("game");

//Variaveis globais
var campo_x = 20;		//Tamanho X do campo
var campo_y = 20;		//Tamanho Y do campo
var pixel_size = 30;	//Tamanho do pixel na fola de estilos
var pixel_border = 2;	//Tamanho da borda do pixel
var snake = [];			//Inicializa o array da cobra
var snake_direct = [];	//Array referente a direção da cobra
snake_direct['x'] = -1;
snake_direct['y'] = 0;
var calda = 0;			//Dá o tamanho da cobra

//Comida
var st_food = false;
var food_x = '';
var food_y = '';

var pixel_width = parseInt(pixel_size+pixel_border)+"px";
var pixel_height = parseInt(pixel_size+pixel_border)+"px";

function iniciar_jogo(){	//Função que cuida da inicialização do jogo

	//Indica que a cobra inicia com o tamnho de 5 pixels
	calda = 5;

	//Tira a comida
	st_food = false;

	//Cria o campo de jogo e inicia a cobra
	criar_campo();
	inicializar_cobra();

	//Reinicia a direção
	snake_direct['x'] = -1;
	snake_direct['y'] = 0;

}

function criar_campo(){		//Cria o campo do jogo

	//Zera o campo
	game.innerHTML = '';

	//Coloca o campo
	for (var x = 1; x <= campo_x; x++) {

		for (var y = 1; y <= campo_y; y++) {

			var pixel = document.createElement("div");
			pixel.setAttribute("id", x + "_" + y);
			pixel.setAttribute("class", "camp_pixel");
			pixel.setAttribute("style", "height: " + pixel_height + "; width: " + pixel_width + ";");
			//console.log(pixel);
			game.appendChild(pixel);

		}

	}

}

function inicializar_cobra(){	//Define os campos iniciais da cobra

	//Zera o array da cobra
	snake = [];

	//Coloca os valores iniciais	
	for (var o = 1; o <= calda; o++) {
		snake[o] = [];
		snake[o]['x'] = campo_x / 2 + (o - 1);
		snake[o]['y'] = campo_y / 2;
	}

}

function renderizar_cobra(){	//Desenha a cobra na página

	for (var c = 1; c <= (snake.length - 1); c++) {

		//Caso a cobra passe por cima da comida, ela aumenta
		if (snake[c]['x'] == food_x && snake[c]['y'] == food_y) {
			comer();
		}

		//Coloca a cor na calda
		var calda_cobra = document.getElementById(snake[c]['x'] + "_" + snake[c]['y']);
		calda_cobra.setAttribute("class", "camp_pixel calda");

		//Verifica se uma parte da cobra não bateu em outra
		for (var i = 1; i <= (snake.length - 1); i++) {
			if (i != c) {
				if (snake[c]['x'] == snake[i]['x'] && snake[c]['y'] == snake[i]['y']) {
					morreu();
				}
			}
		}
	}

}

function comer(){	//Aumenta o tamanho da cobra

	calda++;
	snake[calda] = [];

	if (snake[calda - 1]['x'] == snake[calda - 2]['x']) {
		snake[calda]['x'] = snake[calda - 1]['x'];
		if (snake[calda - 1]['y'] < snake[calda - 2]['y']) {
			snake[calda]['y'] = snake[calda - 1]['y'] - 1;
		} else {
			snake[calda]['y'] = snake[calda - 1]['y'] + 1;
		}
	} else if (snake[calda - 1]['y'] == snake[calda - 2]['y']) {
		snake[calda]['y'] = snake[calda - 1]['y'];
		if (snake[calda - 1]['x'] < snake[calda - 2]['x']) {
			snake[calda]['x'] = snake[calda - 1]['x'] - 1;
		} else {
			snake[calda]['x'] = snake[calda - 1]['x'] + 1;
		}
	}

	if (snake[calda]['x'] < 1) {
		snake[calda]['x'] = 20;
	} else if (snake[calda]['x'] > 20) {
		snake[calda]['x'] = 1;
	}

	if (snake[calda]['y'] < 1) {
		snake[calda]['y'] = 20;
	} else if (snake[calda]['y'] > 20) {
		snake[calda]['y'] = 1;
	}

	//Diz que não existe mais comida no campo
	st_food = false;

}

function desrenderizar_snake() {	//Retira a cobra da página

	for (var c = 1; c <= (snake.length - 1); c++) {

		var calda_cobra = document.getElementById(snake[c]['x'] + "_" + snake[c]['y']);
		calda_cobra.setAttribute("class", "camp_pixel");

	}

}

function mudar_direcao(tecla) {

	if(tecla > 0){

	}else{
		tecla = tecla.code;
	}

	if (tecla == 'ArrowUp' || tecla == 38) {	//Seta para Cima

		if (snake_direct['x'] == 1 && snake_direct['y'] == 0) {

		} else {
			snake_direct['x'] = -1;
			snake_direct['y'] = 0;
		}

	} else if (tecla == 'ArrowRight' || tecla == 39) {	//Seta para Direita

		if (snake_direct['x'] == 0 && snake_direct['y'] == -1) {

		} else {
			snake_direct['x'] = 0;
			snake_direct['y'] = 1;
		}

	} else if (tecla == 'ArrowLeft' || tecla == 37) {	//Seta para Esquerda

		if (snake_direct['x'] == 0 && snake_direct['y'] == 1) {

		} else {
			snake_direct['x'] = 0;
			snake_direct['y'] = -1;
		}

	} else if (tecla == 'ArrowDown' || tecla == 40) {	//Seta para Baixo

		if (snake_direct['x'] == -1 && snake_direct['y'] == 0) {

		} else {
			snake_direct['x'] = 1;
			snake_direct['y'] = 0;
		}

	}

	//console.log(snake_direct['x']+'_'+snake_direct['y']);
	//console.log(tecla);

}

function walk_cobra() {

	for (var p = snake.length - 1; p >= 1; p--) {
		if (p == 1) {
			snake[p]['x'] += snake_direct['x'];
			snake[p]['y'] += snake_direct['y'];
		} else {
			snake[p]['x'] = snake[p - 1]['x'];
			snake[p]['y'] = snake[p - 1]['y'];
		}

		if (snake[p]['x'] < 1) {
			snake[p]['x'] = campo_x;
		} else if (snake[p]['x'] > campo_x) {
			snake[p]['x'] = 1;
		}

		if (snake[p]['y'] < 1) {
			snake[p]['y'] = campo_y;
		} else if (snake[p]['y'] > campo_y) {
			snake[p]['y'] = 1;
		}
	}

}

function morreu() {

	//Jogo acaba
	console.log("Perdeeeuuu");
	iniciar_jogo();

}

function spawn_food() {		//Coloca uma nova comida no campo

	//Verifica se não existe comida no campo
	if (st_food == false) {
		st_food = true;

		food_x = Math.floor(Math.random() * campo_x + 1); //Números de 1 ao tamanho do campo
		food_y = Math.floor(Math.random() * campo_y + 1); //Números de 1 ao tamanho do campo

		console.log(food);

	}

	var food = document.getElementById(food_x + "_" + food_y);
	food.setAttribute("class", "camp_pixel food");

}

function rodar(){	//Função que cuida da atualização em "quadros" (renderização)

	desrenderizar_snake();
	walk_cobra();
	spawn_food();
	renderizar_cobra();

}

//Funções de movimentação em Smartphones

var touch_x_start = 0;
var touch_y_start = 0;
var touch_x_end = 0;
var touch_y_end = 0;

function handleStart(event){

	var pixel = event.changedTouches[0];

	touch_x_start = pixel.clientX;
	touch_y_start = pixel.clientY;

}
function handleEnd(event){

	var pixel = event.changedTouches[0];

	touch_x_end = pixel.clientX;
	touch_y_end = pixel.clientY;

	//Calculos

	if(touch_y_start > touch_y_end){
		var d_x = -1;
		var t_x = touch_x_start - touch_x_end;
	}else{
		var d_x = 1;
		var t_x = touch_x_end - touch_x_start;
	}

	if(touch_x_start > touch_x_end){
		var d_y = -1;
		var t_y = touch_y_start - touch_y_end;
	}else{
		var d_y = 1;
		var t_y = touch_y_end - touch_y_start;
	}

	if(t_x > t_y){
		snake_direct['x'] = d_x;
		snake_direct['y'] = 0;
	}else{
		snake_direct['x'] = 0;
		snake_direct['y'] = d_y;
	}

}
function scroll_back(){
	window.scrollTo(0, 5000000);
}

window.onload = function(){
	
	//Inicia o jogo configurado para PC
	document.getElementById('pc').onclick = function (){

		var html = document.getElementById('html');
		html.setAttribute('onkeydown','mudar_direcao(event)');

		iniciar_jogo();

		setInterval(rodar,100);
	}

	//Inicia o jogo configurado para celulares
	document.getElementById('phone').onclick = function (){

		//Zera oque tiver dentro
		var phone = document.getElementById('phone');

		//Coloca novas div's
		var setas = document.createElement('div');
		setas.setAttribute('id','setas');
		setas.innerHTML = 'Botões';
		phone.appendChild(setas);

		var swipe = document.createElement('div');
		swipe.setAttribute('id','swipe');
		swipe.setAttribute('style','background-color: brown');
		swipe.innerHTML = 'Deslizar';
		phone.appendChild(swipe);

		//document.getElementById('html').style = 'height: 100.1vh !important';

		//Jogar deslizando na tela
		document.getElementById('swipe').onclick = function (){

			var html = document.getElementById('html');
			html.setAttribute('ontouchstart','handleStart(event)');
			html.setAttribute('ontouchend','handleEnd(event)');

			iniciar_jogo();

			setInterval(rodar,100);
			//setInterval(scroll_back,100);

		}

		//Jogar com botões na tela
		document.getElementById('setas').onclick = function (){

			var direcionais = document.getElementById('direcionais');
			direcionais.style.display = 'inline';

			iniciar_jogo();

			setInterval(rodar,100);
			//setInterval(scroll_back,100);

		}
		
	}

}