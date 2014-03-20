// referências ao documento
var tel = document.getElementById("tel");
var anterior = document.getElementById("a");
var proximo = document.getElementById("p");
//realimentando o estado da tela
tel.value = top.frames["centro"].modelo.telefone;
// eventos
anterior.onclick=function(){
	top.frames["centro"].modelo.telefone=tel.value;
	top.frames["centro"].prev();
};
proximo.onclick=function(){
	top.frames["centro"].modelo.telefone=tel.value;
	top.frames["centro"].next();
};
	