// referências ao documento
var mai = document.getElementById("mai");
var anterior = document.getElementById("a");
var concluido = document.getElementById("c");

//helper local
function updateParent(){
	if(mai.value == "S")
		top.frames["centro"].modelo.maior = true
	else 
		top.frames["centro"].modelo.maior = false;
}

//realimentando o estado da tela
mai.value = top.frames["centro"].modelo.maior ? "S" : "N";

// eventos
anterior.onclick=function(){
	updateParent();
	top.frames["centro"].prev();
};
concluido.onclick=function(){
	updateParent();
	top.frames["centro"].displayResults();
};
