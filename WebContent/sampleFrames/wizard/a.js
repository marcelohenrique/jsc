// referências ao documento
var nome = document.getElementById("nme");
var proximo = document.getElementById("p");
//realimentando o estado da tela
if(top.frames["centro"].modelo)
	nome.value = top.frames["centro"].modelo.nome;
// eventos
proximo.onclick=function(){
	top.frames["centro"].modelo.nome=nome.value;
	top.frames["centro"].next();
};