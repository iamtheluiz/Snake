//Campo de jogo
var game = document.getElementById("game");

//Variaveis globais
var campo_x = 20;		//Tamnho X do campo
var campo_y = 20;		//Tamnho Y do campo
var pixel_size = 30;	//Tamanho do pixel na fola de estilos
var pixel_border = 2;	//Tamanho da borda do pixel
var snake = [];			//Inicializa o array da cobra
var snake_direct = [];	//Array referente a direção da cobra
snake_direct['x'] = -1;
snake_direct['y'] = 0;
var calda = 0;			//Dá o tamanho da cobra

var pixel_width = parseInt(pixel_size+pixel_border)+"px";
var pixel_height = parseInt(pixel_size+pixel_border)+"px";

function iniciar_jogo(){	//Função que cuida da inicialização do jogo

	//Indica que a cobra inicia com o tamnho de 5 pixels
	calda = 5;

	//Cria o campo de jogo e inicia a cobra
	criar_campo();
	inicializar_cobra();

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
	for (var o = 1; o <= calda; o++) {
		snake[o] = [];
		snake[o]['x'] = campo_x / 2 + (o - 1);
		snake[o]['y'] = campo_y / 2;
	}
}

function renderizar_cobra(){	//Desenha a cobra na página

	for (var c = 1; c <= (snake.length - 1); c++) {

		var calda_cobra = document.getElementById(snake[c]['x'] + "_" + snake[c]['y']);
		calda_cobra.setAttribute("class", "camp_pixel calda");

		for (var i = 1; i <= (snake.length - 1); i++) {
			if (i != c) {
				if (snake[c]['x'] == snake[i]['x'] && snake[c]['y'] == snake[i]['y']) {
					morreu();
				}
			}
		}
	}

}

function desrenderizar_snake() {	//Retira a cobra da página

	for (var c = 1; c <= (snake.length - 1); c++) {

		var calda_cobra = document.getElementById(snake[c]['x'] + "_" + snake[c]['y']);
		calda_cobra.setAttribute("class", "camp_pixel");

	}

}

function mudar_direcao(tecla) {

	tecla = tecla.code;

	if (tecla == 'ArrowUp') {	//Seta para Cima

		if (snake_direct['x'] == 1 && snake_direct['y'] == 0) {

		} else {
			snake_direct['x'] = -1;
			snake_direct['y'] = 0;
		}

	} else if (tecla == 'ArrowRight') {	//Seta para Direita

		if (snake_direct['x'] == 0 && snake_direct['y'] == -1) {

		} else {
			snake_direct['x'] = 0;
			snake_direct['y'] = 1;
		}

	} else if (tecla == 'ArrowLeft') {	//Seta para Esquerda

		if (snake_direct['x'] == 0 && snake_direct['y'] == 1) {

		} else {
			snake_direct['x'] = 0;
			snake_direct['y'] = -1;
		}

	} else if (tecla == 'ArrowDown') {	//Seta para Baixo

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

function rodar(){	//Função que cuida da atualização em "quadros" (renderização)
	desrenderizar_snake();
	walk_cobra();
	renderizar_cobra();
}

//Inicia o jogo
iniciar_jogo();

//Inicia o loop de atualização
setInterval(rodar,100);