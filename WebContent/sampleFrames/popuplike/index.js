
var pop = document.getElementById("pop");
var cep = document.getElementById("cep");
var more = document.getElementById("more");
var rua = document.getElementById("rua");

function hidepop(){
	pop.style.visibility="hidden";
}
function setEndeco(dado){
	cep.value = dado.cep;
	rua.value = dado.rua;
	// selecionado = dado;
}
more.onclick=function(){
	pop.src="popup.html";
	pop.style.visibility="visible";
};
//sanando estado inicial
top.someAguarde();