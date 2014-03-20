// referências ao documento
var end = document.getElementById("end");
var anterior = document.getElementById("a");
var proximo = document.getElementById("p");
//realimentando o estado da tela
end.value = top.frames["centro"].modelo.endereco;
// eventos
anterior.onclick=function(){
	top.frames["centro"].modelo.endereco=end.value;
	top.frames["centro"].prev();
};
proximo.onclick=function(){
	top.frames["centro"].modelo.endereco=end.value;
	top.frames["centro"].next();
};
