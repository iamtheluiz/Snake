//Campo de jogo
var game = document.getElementById("game");

//Variaveis globais
var campo_x = 20;		//Tamnho X do campo
var campo_y = 20;		//Tamnho Y do campo
var pixel_size = 30;	//Tamanho do pixel na fola de estilos
var pixel_border = 2;	//Tamanho da borda do pixel

var pixel_width = parseInt(pixel_size+pixel_border)+"px";
var pixel_height = parseInt(pixel_size+pixel_border)+"px";

function iniciar_jogo(){	//Função que cuida da inicialização do jogo

	criar_campo();

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

function rodar(){	//Função que cuida da atualização em "quadros" (renderização)

}